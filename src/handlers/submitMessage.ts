// Handles /submit-message by fetching a user's code-block message by Discord message ID.
import type { ChatInputCommandInteraction } from "discord.js";
import { getChallenge } from "../db/challenges.js";
import {
  addSubmission,
  hasUserSubmitted
} from "../db/submissions.js";
import { parseCodeSubmission } from "../evaluation/codeFence.js";
import { replyWithSubmissionResult } from "./submissionComparison.js";

export async function handleSubmitMessage(interaction: ChatInputCommandInteraction): Promise<void> {
  if (!interaction.guildId || !interaction.channel || !interaction.channel.isTextBased()) {
    await interaction.reply("Message submissions can only be made inside a text channel.");
    return;
  }

  const challengeId = interaction.options.getString("challenge_id", true).toUpperCase();
  const messageId = interaction.options.getString("message_id", true);
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

  if (challenge.status === "evaluating") {
    await interaction.reply(`${challenge.id} is already being evaluated by CodeBattle AI.`);
    return;
  }

  if (challenge.status === "evaluation_failed") {
    await interaction.reply(`${challenge.id} has a failed evaluation. The challenge creator can retry with /evaluate.`);
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

  const message = await interaction.channel.messages.fetch(messageId).catch(() => null);

  if (!message) {
    await interaction.reply("I could not find that message in this channel.");
    return;
  }

  if (message.author.id !== interaction.user.id) {
    await interaction.reply("You can only submit a message that you wrote.");
    return;
  }

  const submission = parseCodeSubmission(message.content);

  if (!submission) {
    await interaction.reply("That message must contain exactly one fenced `js` or `ts` code block.");
    return;
  }

  await interaction.deferReply();

  await addSubmission(interaction.guildId, challenge, {
    userId: interaction.user.id,
    answer: submission.source,
    language: submission.language,
    channelId: interaction.channelId,
    messageId
  });

  await replyWithSubmissionResult(interaction, challenge);
}
