import type { Challenge, Submission, SubmissionRow } from "../types.js";
export declare function addSubmission(guildId: string, challenge: Challenge, submission: Omit<Submission, "submittedAt">): Promise<void>;
export declare function hasUserSubmitted(guildId: string, challengeId: string, userId: string): Promise<boolean>;
export declare function getChallengeSubmissions(guildId: string, challengeId: string): Promise<SubmissionRow[]>;
export declare function getSubmissionCount(guildId: string, challengeId: string): Promise<number>;
//# sourceMappingURL=submissions.d.ts.map