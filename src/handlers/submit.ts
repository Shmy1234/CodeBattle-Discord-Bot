import type { ChatInputCommandInteraction } from "discord.js";
import { getChallenge } from "../db/challenges.js";
import { addSubmission, hasUserSubmitted } from "../db/submissions.js";
import { parseCodeSubmission } from "../evaluation/codeFence.js";
import { parseDiscordMessageReference } from "../discord/messageReference.js";
import { replyWithSubmissionResult } from "./submissionComparison.js";

export async function handleSubmit(interaction: ChatInputCommandInteraction): Promise<void> {
  if (!interaction.guildId) {
    await interaction.reply("Submissions can only be made inside a server.");
    return;
  }

  const challengeId = interaction.options.getString("challenge_id", true).toUpperCase();
  const messageReferenceInput = interaction.options.getString("message", true);
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

  const reference = parseDiscordMessageReference(messageReferenceInput);

  if (!reference) {
    await interaction.reply("Provide a Discord message ID or a full Discord message link.");
    return;
  }

  if (reference.guildId && reference.guildId !== interaction.guildId) {
    await interaction.reply("That message link belongs to a different Discord server.");
    return;
  }

  const channel = reference.channelId
    ? await interaction.client.channels.fetch(reference.channelId).catch(() => null)
    : interaction.channel;

  if (!channel || !channel.isTextBased()) {
    await interaction.reply("I could not access the text channel containing that message.");
    return;
  }

  const message = await channel.messages.fetch(reference.messageId).catch(() => null);

  if (!message) {
    await interaction.reply("I could not find that message. Check the ID/link and the bot's channel permissions.");
    return;
  }

  if (message.guildId !== interaction.guildId) {
    await interaction.reply("That message does not belong to this Discord server.");
    return;
  }

  if (message.author.id !== interaction.user.id) {
    await interaction.reply("You can only submit a code message that you wrote.");
    return;
  }

  const submission = parseCodeSubmission(message.content);

  if (!submission) {
    await interaction.reply("That message must contain exactly one fenced `js` or `ts` code block and no other text.");
    return;
  }

  await interaction.deferReply();

  await addSubmission(interaction.guildId, challenge, {
    userId: interaction.user.id,
    answer: submission.source,
    language: submission.language,
    channelId: message.channelId,
    messageId: message.id
  });

  await replyWithSubmissionResult(interaction, challenge);
}
