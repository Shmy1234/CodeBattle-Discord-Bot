import type { ChatInputCommandInteraction } from "discord.js";
import { handleActive } from "./active.js";
import { handleChallenge } from "./challenge.js";
import { handleChallengeInfo } from "./challengeInfo.js";
import { handleLeaderboard } from "./leaderboard.js";
import { handleSubmit } from "./submit.js";
import { handleSubmitMessage } from "./submitMessage.js";
import { handleWinner } from "./winner.js";

export async function handleCommand(interaction: ChatInputCommandInteraction): Promise<void> {
  switch (interaction.commandName) {
    case "ping":
      await interaction.reply("Pong!!! CodeBattle bot is online.");
      return;

    case "challenge":
      await handleChallenge(interaction);
      return;

    case "submit":
      await handleSubmit(interaction);
      return;

    case "submit-message":
      await handleSubmitMessage(interaction);
      return;

    case "leaderboard":
      await handleLeaderboard(interaction);
      return;

    case "winner":
      await handleWinner(interaction);
      return;

    case "active":
      await handleActive(interaction);
      return;

    case "challenge-info":
      await handleChallengeInfo(interaction);
      return;
  }
}
