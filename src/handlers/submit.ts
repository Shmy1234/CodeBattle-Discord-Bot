// Handles /submit for direct text/code answers entered into the slash command.
import type { ChatInputCommandInteraction } from "discord.js";
import { getChallenge } from "../db/challenges.js";
import { addSubmission, hasUserSubmitted } from "../db/submissions.js";
import { replyWithSubmissionResult } from "./submissionComparison.js";

export async function handleSubmit(interaction: ChatInputCommandInteraction): Promise<void> {
  if (!interaction.guildId) {
    await interaction.reply("Submissions can only be made inside a server.");
    return;
  }

  const challengeId = interaction.options.getString("challenge_id", true).toUpperCase();
  const answer = interaction.options.getString("answer", true);
  const challenge = await getChallenge(interaction.guildId, challengeId);

  if (!challenge) {
    await interaction.reply(`I could not find challenge ${challengeId} in this server.`);
    return;
  }

  if (challenge.status === "completed") {
    await interaction.reply(`${challenge.id} is already completed.`);
    return;
  }

  if (challenge.status === "cancelled") {
    await interaction.reply(`${challenge.id} has been cancelled.`);
    return;
  }

  const isParticipant =
    interaction.user.id === challenge.challengerId ||
    interaction.user.id === challenge.opponentId;

  if (!isParticipant) {
    await interaction.reply("Only the challenger or opponent can submit for this challenge.");
    return;
  }

  if (await hasUserSubmitted(interaction.guildId, challenge.id, interaction.user.id)) {
    await interaction.reply("You have already submitted for this challenge.");
    return;
  }

  await addSubmission(interaction.guildId, challenge, {
    userId: interaction.user.id,
    answer
  });

  await replyWithSubmissionResult(interaction, challenge);
}
