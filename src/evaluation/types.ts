import type { Difficulty } from "../problems.js";
import type { SubmissionLanguage } from "../types.js";

export type Complexity = "O(1)" | "O(log n)" | "O(n)" | "O(n log n)" | "O(n^2)" | "O(n^3)" | "O(2^n)" | "O(n!)" | "unknown";

export type TestCase = {
  id: string;
  args: unknown[];
  expected: unknown;
};

export type ProblemTestSuite = {
  problem: string;
  difficulty: Difficulty;
  functionName: string;
  description: string;
  expectedTimeComplexity: Complexity;
  expectedSpaceComplexity: Complexity;
  publicCases: TestCase[];
  hiddenCases: TestCase[];
  matcher: "deep-equal" | "two-sum";
  version: string;
};

export type ParsedCodeSubmission = {
  language: SubmissionLanguage;
  source: string;
};

export type SandboxCaseResult = {
  id: string;
  value: unknown;
  elapsedMs: number;
  error: string | null;
};

export type SandboxEvaluation = {
  passedCount: number;
  totalCount: number;
  medianRuntimeMs: number;
  peakMemoryKb: number;
  failedCaseIds: string[];
  runtimeVersion: string;
};

export type AiEvaluation = {
  estimatedTimeComplexity: Complexity;
  estimatedSpaceComplexity: Complexity;
  codeQualityScore: number;
  correctnessSummary: string;
  feedback: string[];
  confidence: number;
};

export type EvaluationProvider = "openrouter";

export type SubmissionEvaluation = {
  userId: string;
  language: SubmissionLanguage;
  sandbox: SandboxEvaluation;
  ai: AiEvaluation;
};

export type ChallengeVerdict = {
  winnerId: string;
  loserId: string;
  reason: string;
  tieBreaker: string | null;
  testSuiteVersion: string;
  provider: EvaluationProvider;
  model: string;
  winnerEvaluation: SubmissionEvaluation;
  loserEvaluation: SubmissionEvaluation;
};
