// Supabase queries for server-specific leaderboard scores.
import { supabase } from "../supabase.js";
export async function getLeaderboard(guildId) {
    const { data, error } = await supabase
        .from("scores")
        .select("user_id, points")
        .eq("guild_id", guildId)
        .order("points", { ascending: false })
        .limit(10)
        .returns();
    if (error) {
        throw new Error(`Failed to get leaderboard: ${error.message}`);
    }
    return data ?? [];
}
//# sourceMappingURL=scores.js.map