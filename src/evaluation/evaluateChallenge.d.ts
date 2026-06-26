import type { Challenge, SubmissionRow } from "../types.js";
import type { ChallengeVerdict } from "./types.js";
export declare function runChallengeEvaluation(challenge: Challenge, submissions: SubmissionRow[]): Promise<ChallengeVerdict>;
export declare function formatVerdict(challengeId: string, verdict: ChallengeVerdict): string;
//# sourceMappingURL=evaluateChallenge.d.ts.map