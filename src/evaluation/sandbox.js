import { Sandbox } from "e2b";
import * as ts from "typescript";
import { config } from "../config.js";
import { allTestCases, testCaseMatches } from "./testSuites.js";
const commandTimeoutMs = 7_000;
const sandboxTimeoutMs = 20_000;
const benchmarkIterations = 5;
export async function evaluateSubmissionInSandbox(suite, language, source) {
    if (!config.e2bApiKey) {
        throw new Error("CodeBattle AI is not configured: E2B_API_KEY is missing.");
    }
    const compiledSource = compileSource(source, language);
    const sandbox = await Sandbox.create(config.e2bSandboxTemplate, {
        apiKey: config.e2bApiKey,
        allowInternetAccess: false,
        secure: true,
        timeoutMs: sandboxTimeoutMs
    });
    try {
        await sandbox.files.write("/tmp/codebattle-runner.cjs", sandboxRunnerSource);
        const payload = Buffer.from(JSON.stringify({
            source: compiledSource,
            functionName: suite.functionName,
            cases: allTestCases(suite).map((testCase) => ({ id: testCase.id, args: testCase.args })),
            benchmarkIterations
        })).toString("base64url");
        const result = await sandbox.commands.run("timeout 4s node --max-old-space-size=128 /tmp/codebattle-runner.cjs", {
            envs: { CODEBATTLE_PAYLOAD: payload },
            timeoutMs: commandTimeoutMs
        });
        if (result.exitCode !== 0) {
            throw new Error("The sandbox could not execute this submission within its limits.");
        }
        const output = parseRunnerOutput(result.stdout);
        const testCases = allTestCases(suite);
        const failedCaseIds = output.results
            .filter((caseResult, index) => {
            const testCase = testCases[index];
            return !testCase || caseResult.error !== null || !testCaseMatches(suite, testCase, caseResult.value);
        })
            .map((caseResult) => caseResult.id);
        const passedCount = testCases.length - failedCaseIds.length;
        const runtimes = output.results
            .filter((caseResult) => caseResult.error === null)
            .map((caseResult) => caseResult.elapsedMs);
        return {
            passedCount,
            totalCount: testCases.length,
            medianRuntimeMs: median(runtimes),
            peakMemoryKb: output.peakMemoryKb,
            failedCaseIds,
            runtimeVersion: output.runtimeVersion
        };
    }
    finally {
        await sandbox.kill().catch(() => undefined);
    }
}
function compileSource(source, language) {
    const result = ts.transpileModule(source, {
        compilerOptions: {
            target: ts.ScriptTarget.ES2022,
            module: ts.ModuleKind.CommonJS,
            strict: true
        },
        reportDiagnostics: true,
        fileName: language === "typescript" ? "submission.ts" : "submission.js"
    });
    const diagnostics = (result.diagnostics ?? []).filter((diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error);
    if (diagnostics.length > 0) {
        const firstDiagnostic = diagnostics[0];
        throw new Error(`Submission has invalid ${language} syntax: ${ts.flattenDiagnosticMessageText(firstDiagnostic.messageText, " ")}`);
    }
    return result.outputText;
}
function parseRunnerOutput(stdout) {
    const line = stdout.trim().split("\n").at(-1);
    if (!line) {
        throw new Error("The sandbox returned no evaluation result.");
    }
    let parsed;
    try {
        parsed = JSON.parse(line);
    }
    catch {
        throw new Error("The sandbox returned an invalid evaluation result.");
    }
    if (!isRunnerOutput(parsed)) {
        throw new Error("The sandbox returned an incomplete evaluation result.");
    }
    return parsed;
}
function isRunnerOutput(value) {
    if (!value || typeof value !== "object") {
        return false;
    }
    const candidate = value;
    return Array.isArray(candidate.results) &&
        typeof candidate.peakMemoryKb === "number" &&
        typeof candidate.runtimeVersion === "string" &&
        candidate.results.every(isSandboxCaseResult);
}
function isSandboxCaseResult(value) {
    if (!value || typeof value !== "object") {
        return false;
    }
    const candidate = value;
    return typeof candidate.id === "string" &&
        typeof candidate.elapsedMs === "number" &&
        (typeof candidate.error === "string" || candidate.error === null);
}
function median(values) {
    if (values.length === 0) {
        return Number.POSITIVE_INFINITY;
    }
    const sorted = [...values].sort((left, right) => left - right);
    const middle = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0
        ? (sorted[middle - 1] + sorted[middle]) / 2
        : sorted[middle];
}
export const sandboxRunnerSource = String.raw `
const vm = require("node:vm");
const payload = JSON.parse(Buffer.from(process.env.CODEBATTLE_PAYLOAD, "base64url").toString("utf8"));
const moduleRef = { exports: {} };
const context = vm.createContext({
  module: moduleRef,
  exports: moduleRef.exports,
  JSON,
  Array,
  Object,
  String,
  Number,
  Boolean,
  Math,
  Set,
  Map
});

function median(values) {
  const sorted = [...values].sort((left, right) => left - right);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[middle - 1] + sorted[middle]) / 2
    : sorted[middle];
}

function serialise(value) {
  const serialised = JSON.stringify(value);
  if (serialised === undefined) {
    throw new Error("The solution returned undefined or a non-JSON value.");
  }
  return JSON.parse(serialised);
}

try {
  new vm.Script(payload.source, { filename: "submission.cjs" }).runInContext(context, { timeout: 300 });
  const exported = context.module.exports;
  const candidate = typeof exported === "function"
    ? exported
    : exported[payload.functionName] || context[payload.functionName];

  if (typeof candidate !== "function") {
    throw new Error("Expected a function named " + payload.functionName + ".");
  }

  context.__candidate = candidate;
  const results = payload.cases.map((testCase) => {
    const elapsed = [];
    let value = null;
    let error = null;

    try {
      for (let iteration = 0; iteration < payload.benchmarkIterations; iteration += 1) {
        context.__args = testCase.args;
        const started = process.hrtime.bigint();
        new vm.Script("__result = __candidate(...__args)").runInContext(context, { timeout: 300 });
        const completed = process.hrtime.bigint();
        if (context.__result && typeof context.__result.then === "function") {
          throw new Error("Async solutions are not supported.");
        }
        elapsed.push(Number(completed - started) / 1000000);
        if (iteration === 0) {
          value = serialise(context.__result);
        }
      }
    } catch (caught) {
      error = caught instanceof Error ? caught.message.slice(0, 160) : "Submission failed.";
    }

    return { id: testCase.id, value, elapsedMs: elapsed.length ? median(elapsed) : 0, error };
  });

  process.stdout.write(JSON.stringify({
    results,
    peakMemoryKb: process.resourceUsage().maxRSS,
    runtimeVersion: process.version
  }));
} catch (caught) {
  process.stderr.write(caught instanceof Error ? caught.message : "Runner failed.");
  process.exitCode = 1;
}
`;
//# sourceMappingURL=sandbox.js.map