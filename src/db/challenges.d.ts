import type { Challenge } from "../types.js";
export declare function createChallenge(input: Omit<Challenge, "id" | "createdAt">): Promise<Challenge>;
export declare function getChallenge(guildId: string, challengeId: string): Promise<Challenge | undefined>;
export declare function getActiveChallengesForGuild(guildId: string): Promise<Challenge[]>;
export declare function claimChallengeEvaluation(guildId: string, challengeId: string): Promise<boolean>;
export declare function markChallengeEvaluationFailed(guildId: string, challengeId: string, errorMessage: string): Promise<void>;
//# sourceMappingURL=challenges.d.ts.map