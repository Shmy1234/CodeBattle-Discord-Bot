// Discord slash command definitions. Run npm run register after changing this file.
import { SlashCommandBuilder } from "discord.js";
import { topics } from "./topics.js";

export const commands = [
  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Check if the bot is online")
    .toJSON(),

  new SlashCommandBuilder()
    .setName("challenge")
    .setDescription("Challenge another user to a coding problem")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user you want to challenge")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("difficulty")
        .setDescription("Choose the difficulty")
        .setRequired(true)
        .addChoices(
          { name: "Easy", value: "easy" },
          { name: "Medium", value: "medium" },
          { name: "Hard", value: "hard" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("topic")
        .setDescription("Choose the coding topic")
        .setRequired(true)
        .addChoices(...topics)
    )
    .toJSON(),

  new SlashCommandBuilder()
    .setName("submit")
    .setDescription("Submit an answer for a coding challenge")
    .addStringOption((option) =>
      option
        .setName("challenge_id")
        .setDescription("The challenge ID, like CB-1001")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("answer")
        .setDescription("Your solution or explanation")
        .setRequired(true)
    )
    .toJSON(),

  new SlashCommandBuilder()
    .setName("submit-message")
    .setDescription("Submit code from a Discord message ID")
    .addStringOption((option) =>
      option
        .setName("challenge_id")
        .setDescription("The challenge ID, like CB-1001")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("message_id")
        .setDescription("The ID of your code block message in this channel")
        .setRequired(true)
    )
    .toJSON(),

  new SlashCommandBuilder()
    .setName("leaderboard")
    .setDescription("Show the CodeBattle leaderboard for this server")
    .toJSON(),

  new SlashCommandBuilder()
    .setName("evaluate")
    .setDescription("Retry a failed CodeBattle AI evaluation")
    .addStringOption((option) =>
      option
        .setName("challenge_id")
        .setDescription("The challenge ID, like CB-1001")
        .setRequired(true)
    )
    .toJSON(),

  new SlashCommandBuilder()
    .setName("active")
    .setDescription("Show active challenges in this server")
    .toJSON(),

  new SlashCommandBuilder()
    .setName("challenge-info")
    .setDescription("Show details for a challenge")
    .addStringOption((option) =>
      option
        .setName("challenge_id")
        .setDescription("The challenge ID, like CB-1001")
        .setRequired(true)
    )
    .toJSON()
];
