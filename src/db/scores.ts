// Supabase queries for server-specific leaderboard scores.
import { supabase } from "../supabase.js";
import type { ScoreRow } from "../types.js";

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
