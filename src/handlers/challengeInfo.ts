// Handles /challenge-info by showing challenge details, prompt metadata, and submission count.
import type { ChatInputCommandInteraction } from "discord.js";
import { getChallenge } from "../db/challenges.js";
import { getSubmissionCount } from "../db/submissions.js";
import { formatProblemDetails } from "../problemDetails.js";

export async function handleChallengeInfo(interaction: ChatInputCommandInteraction): Promise<void> {
  if (!interaction.guildId) {
    await interaction.reply("Challenge info is only available inside a server.");
    return;
  }

  const challengeId = interaction.options.getString("challenge_id", true).toUpperCase();
  const challenge = await getChallenge(interaction.guildId, challengeId);

  if (!challenge) {
    await interaction.reply(`I could not find challenge ${challengeId} in this server.`);
    return;
  }

  const submissionCount = await getSubmissionCount(interaction.guildId, challenge.id);
  const problemDetails = formatProblemDetails(challenge.problem);

  await interaction.reply(
    `Challenge ID: ${challenge.id}\n` +
    `Status: ${challenge.status}\n` +
    `Players: <@${challenge.challengerId}> vs <@${challenge.opponentId}>\n` +
    `Difficulty: ${challenge.difficulty}\n` +
    `Topic: ${challenge.topic}\n` +
    `Problem: ${challenge.problem}\n` +
    `${problemDetails}\n` +
    `Submissions: ${submissionCount}\n` +
    `Winner: ${challenge.winnerId ? `<@${challenge.winnerId}>` : "None yet"}`
  );
}
