// Supabase queries for creating, reading, and updating challenge records.
import { supabase } from "../supabase.js";
import { isDifficulty } from "../problems.js";
import type { Challenge, ChallengeRow, ChallengeStatus } from "../types.js";

export async function createChallenge(input: Omit<Challenge, "id" | "createdAt">): Promise<Challenge> {
  const challenge: Challenge = {
    ...input,
    id: createChallengeId(),
    createdAt: new Date().toISOString()
  };

  const { error } = await supabase.from("challenges").insert({
    id: challenge.id,
    guild_id: challenge.guildId,
    challenger_id: challenge.challengerId,
    opponent_id: challenge.opponentId,
    difficulty: challenge.difficulty,
    topic: challenge.topic,
    problem: challenge.problem,
    status: challenge.status,
    winner_id: challenge.winnerId,
    created_at: challenge.createdAt
  });

  if (error) {
    throw new Error(`Failed to create challenge: ${error.message}`);
  }

  return challenge;
}

export async function getChallenge(guildId: string, challengeId: string): Promise<Challenge | undefined> {
  const { data, error } = await supabase
    .from("challenges")
    .select("*")
    .eq("guild_id", guildId)
    .eq("id", challengeId.toUpperCase())
    .maybeSingle<ChallengeRow>();

  if (error) {
    throw new Error(`Failed to get challenge: ${error.message}`);
  }

  return data ? mapChallenge(data) : undefined;
}

export async function getActiveChallengesForGuild(guildId: string): Promise<Challenge[]> {
  const { data, error } = await supabase
    .from("challenges")
    .select("*")
    .eq("guild_id", guildId)
    .in("status", ["active", "submitted", "evaluating", "evaluation_failed"])
    .order("created_at", { ascending: false })
    .limit(10)
    .returns<ChallengeRow[]>();

  if (error) {
    throw new Error(`Failed to get active challenges: ${error.message}`);
  }

  return (data ?? []).map(mapChallenge);
}

export async function claimChallengeEvaluation(guildId: string, challengeId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from("challenges")
    .update({ status: "evaluating", evaluation_error: null })
    .eq("guild_id", guildId)
    .eq("id", challengeId)
    .in("status", ["active", "submitted", "evaluation_failed"])
    .select("id");

  if (error) {
    throw new Error(`Failed to claim challenge evaluation: ${error.message}`);
  }

  return (data?.length ?? 0) === 1;
}

export async function markChallengeEvaluationFailed(
  guildId: string,
  challengeId: string,
  errorMessage: string
): Promise<void> {
  const { error } = await supabase
    .from("challenges")
    .update({
      status: "evaluation_failed",
      evaluation_error: errorMessage.slice(0, 500)
    })
    .eq("guild_id", guildId)
    .eq("id", challengeId)
    .eq("status", "evaluating");

  if (error) {
    throw new Error(`Failed to record evaluation failure: ${error.message}`);
  }
}

function createChallengeId(): string {
  return `CB-${Date.now().toString(36).toUpperCase()}`;
}

function mapChallenge(row: ChallengeRow): Challenge {
  if (!isDifficulty(row.difficulty)) {
    throw new Error(`Invalid difficulty in database: ${row.difficulty}`);
  }

  if (!isChallengeStatus(row.status)) {
    throw new Error(`Invalid challenge status in database: ${row.status}`);
  }

  return {
    id: row.id,
    guildId: row.guild_id,
    challengerId: row.challenger_id,
    opponentId: row.opponent_id,
    difficulty: row.difficulty,
    topic: row.topic,
    problem: row.problem,
    status: row.status,
    winnerId: row.winner_id,
    createdAt: row.created_at
  };
}

function isChallengeStatus(value: string): value is ChallengeStatus {
  return value === "active" ||
    value === "submitted" ||
    value === "evaluating" ||
    value === "completed" ||
    value === "cancelled" ||
    value === "evaluation_failed";
}
