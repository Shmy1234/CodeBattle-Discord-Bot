// Handles /leaderboard for server-specific score rankings.
import type { ChatInputCommandInteraction } from "discord.js";
import { getLeaderboard } from "../db/scores.js";

export async function handleLeaderboard(interaction: ChatInputCommandInteraction): Promise<void> {
  if (!interaction.guildId) {
    await interaction.reply("Leaderboards are only available inside a server.");
    return;
  }

  const leaderboard = await getLeaderboard(interaction.guildId);

  if (leaderboard.length === 0) {
    await interaction.reply("No CodeBattle AI verdicts yet. Complete a challenge with two submissions to create one.");
    return;
  }

  const rows = leaderboard.map((score, index) => {
    return `${index + 1}. <@${score.user_id}> - ${score.points} point(s)`;
  });

  await interaction.reply(`CodeBattle leaderboard:\n${rows.join("\n")}`);
}
