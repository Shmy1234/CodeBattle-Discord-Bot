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
    .in("status", ["active", "submitted"])
    .order("created_at", { ascending: false })
    .limit(10)
    .returns<ChallengeRow[]>();

  if (error) {
    throw new Error(`Failed to get active challenges: ${error.message}`);
  }

  return (data ?? []).map(mapChallenge);
}

export async function updateChallengeWinner(
  guildId: string,
  challenge: Challenge,
  winnerId: string
): Promise<void> {
  const { error } = await supabase
    .from("challenges")
    .update({
      status: "completed",
      winner_id: winnerId
    })
    .eq("guild_id", guildId)
    .eq("id", challenge.id);

  if (error) {
    throw new Error(`Failed to update winner: ${error.message}`);
  }
}

export async function markChallengeSubmitted(guildId: string, challengeId: string): Promise<void> {
  const { error } = await supabase
    .from("challenges")
    .update({ status: "submitted" })
    .eq("guild_id", guildId)
    .eq("id", challengeId);

  if (error) {
    throw new Error(`Failed to update challenge status: ${error.message}`);
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
    value === "completed" ||
    value === "cancelled";
}
