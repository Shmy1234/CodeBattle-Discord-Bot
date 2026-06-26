import type { SubmissionLanguage } from "../types.js";
import type { ProblemTestSuite, SandboxEvaluation } from "./types.js";
export declare function evaluateSubmissionInSandbox(suite: ProblemTestSuite, language: SubmissionLanguage, source: string): Promise<SandboxEvaluation>;
export declare const sandboxRunnerSource: string;
//# sourceMappingURL=sandbox.d.ts.map