import type { AiEvaluation, Complexity, ProblemTestSuite, SandboxEvaluation } from "./types.js";
export declare function evaluateSourceWithOpenRouter(suite: ProblemTestSuite, language: "javascript" | "typescript", source: string, sandbox: SandboxEvaluation): Promise<AiEvaluation>;
export declare function complexityRank(complexity: Complexity): number;
//# sourceMappingURL=aiJudge.d.ts.map