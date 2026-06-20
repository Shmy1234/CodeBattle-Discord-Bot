// Handles /challenge: validates the request, picks a problem, and stores the challenge.
import type { ChatInputCommandInteraction } from "discord.js";
import { createChallenge } from "../db/challenges.js";
import { formatProblemDetails } from "../problemDetails.js";
import { isDifficulty, pickProblem } from "../problems.js";
import { getTopicName, isTopic } from "../topics.js";

export async function handleChallenge(interaction: ChatInputCommandInteraction): Promise<void> {
  const opponent = interaction.options.getUser("user");
  const difficulty = interaction.options.getString("difficulty");
  const topic = interaction.options.getString("topic");

  if (!interaction.guildId) {
    await interaction.reply("Challenges can only be created inside a server.");
    return;
  }

  if (!opponent) {
    await interaction.reply("Please choose a user to challenge.");
    return;
  }

  if (opponent.bot) {
    await interaction.reply("Please choose a human opponent.");
    return;
  }

  if (opponent.id === interaction.user.id) {
    await interaction.reply("Challenge another user, not yourself.");
    return;
  }

  if (!isDifficulty(difficulty)) {
    await interaction.reply("Please choose a valid difficulty: easy, medium, or hard.");
    return;
  }

  if (!isTopic(topic)) {
    await interaction.reply("Please choose a valid topic from the dropdown.");
    return;
  }

  const problem = pickProblem(difficulty);
  const problemDetails = formatProblemDetails(problem);
  const challenge = await createChallenge({
    guildId: interaction.guildId,
    challengerId: interaction.user.id,
    opponentId: opponent.id,
    difficulty,
    topic,
    problem,
    status: "active",
    winnerId: null
  });

  await interaction.reply(
    `${interaction.user} challenged ${opponent}!\n` +
    `Challenge ID: ${challenge.id}\n` +
    `Status: ${challenge.status}\n` +
    `Difficulty: ${challenge.difficulty}\n` +
    `Topic: ${getTopicName(topic)}\n\n` +
    `Problem: ${challenge.problem}\n` +
    `${problemDetails}\n\n` +
    `Submit with: /submit challenge_id:${challenge.id} answer:your solution`
  );
}
