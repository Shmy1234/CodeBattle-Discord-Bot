// Handles /winner: completes a challenge and awards leaderboard points.
import type { ChatInputCommandInteraction } from "discord.js";
import { getChallenge, updateChallengeWinner } from "../db/challenges.js";
import { addScore } from "../db/scores.js";

export async function handleWinner(interaction: ChatInputCommandInteraction): Promise<void> {
  if (!interaction.guildId) {
    await interaction.reply("Winners can only be set inside a server.");
    return;
  }

  const challengeId = interaction.options.getString("challenge_id", true).toUpperCase();
  const winner = interaction.options.getUser("user", true);
  const challenge = await getChallenge(interaction.guildId, challengeId);

  if (!challenge) {
    await interaction.reply(`I could not find challenge ${challengeId} in this server.`);
    return;
  }

  const isChallengeOwner = interaction.user.id === challenge.challengerId;
  const isParticipant =
    winner.id === challenge.challengerId ||
    winner.id === challenge.opponentId;

  if (!isChallengeOwner) {
    await interaction.reply("Only the user who created the challenge can choose the winner.");
    return;
  }

  if (!isParticipant) {
    await interaction.reply("The winner must be the challenger or opponent.");
    return;
  }

  if (challenge.status === "completed") {
    await interaction.reply(`${challenge.id} already has a winner: <@${challenge.winnerId}>.`);
    return;
  }

  if (challenge.status === "cancelled") {
    await interaction.reply(`${challenge.id} has been cancelled.`);
    return;
  }

  await updateChallengeWinner(interaction.guildId, challenge, winner.id);
  await addScore(interaction.guildId, winner.id, 1);

  await interaction.reply(
    `${winner} won ${challenge.id} and earned 1 point.`
  );
}
