import type { ChallengeVerdict, SubmissionEvaluation } from "../evaluation/types.js";
export declare function saveSubmissionEvaluation(guildId: string, challengeId: string, evaluation: SubmissionEvaluation, testSuiteVersion: string, model: string): Promise<void>;
export declare function finalizeChallengeEvaluation(guildId: string, challengeId: string, verdict: ChallengeVerdict): Promise<boolean>;
//# sourceMappingURL=evaluations.d.ts.map