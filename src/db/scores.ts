// Supabase queries for server-specific leaderboard scores.
import { supabase } from "../supabase.js";
import type { ScoreRow } from "../types.js";

export async function addScore(guildId: string, userId: string, points: number): Promise<void> {
  const { data, error: selectError } = await supabase
    .from("scores")
    .select("points")
    .eq("guild_id", guildId)
    .eq("user_id", userId)
    .maybeSingle<{ points: number }>();

  if (selectError) {
    throw new Error(`Failed to get score: ${selectError.message}`);
  }

  const { error: upsertError } = await supabase.from("scores").upsert({
    guild_id: guildId,
    user_id: userId,
    points: (data?.points ?? 0) + points
  });

  if (upsertError) {
    throw new Error(`Failed to update score: ${upsertError.message}`);
  }
}

export async function getLeaderboard(guildId: string): Promise<ScoreRow[]> {
  const { data, error } = await supabase
    .from("scores")
    .select("user_id, points")
    .eq("guild_id", guildId)
    .order("points", { ascending: false })
    .limit(10)
    .returns<ScoreRow[]>();

  if (error) {
    throw new Error(`Failed to get leaderboard: ${error.message}`);
  }

  return data ?? [];
}
