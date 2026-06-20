// Handles /active by listing active and submitted challenges for the current server.
import type { ChatInputCommandInteraction } from "discord.js";
import { getActiveChallengesForGuild } from "../db/challenges.js";

export async function handleActive(interaction: ChatInputCommandInteraction): Promise<void> {
  if (!interaction.guildId) {
    await interaction.reply("Active challenges are only available inside a server.");
    return;
  }

  const active = await getActiveChallengesForGuild(interaction.guildId);

  if (active.length === 0) {
    await interaction.reply("There are no active challenges in this server.");
    return;
  }

  const rows = active.map((challenge) => {
    return `${challenge.id} - ${challenge.status} - ${challenge.problem} - <@${challenge.challengerId}> vs <@${challenge.opponentId}>`;
  });

  await interaction.reply(`Active challenges:\n${rows.join("\n")}`);
}
