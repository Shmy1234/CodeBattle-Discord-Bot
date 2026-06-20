// Posts the clean two-solution comparison once both challenge participants submit.
import type { ChatInputCommandInteraction } from "discord.js";
import { getChallengeSubmissions } from "../db/submissions.js";
import type { Challenge } from "../types.js";

export async function replyWithSubmissionResult(
  interaction: ChatInputCommandInteraction,
  challenge: Challenge
): Promise<void> {
  if (!interaction.guildId) {
    await interaction.reply("Submission received.");
    return;
  }

  const submissions = await getChallengeSubmissions(interaction.guildId, challenge.id);
  const participantSubmissions = submissions.filter((submission) =>
    submission.user_id === challenge.challengerId ||
    submission.user_id === challenge.opponentId
  );

  if (participantSubmissions.length < 2) {
    await interaction.reply(
      `Submission received for ${challenge.id} from ${interaction.user}. Waiting for the other player.`
    );
    return;
  }

  const comparison = participantSubmissions
    .slice(0, 2)
    .map((submission) => {
      return `<@${submission.user_id}> solution:\n${formatCodeBlock(submission.answer)}`;
    })
    .join("\n\n");

  await interaction.reply(
    `Both solutions submitted for ${challenge.id}.\n\n` +
    `${comparison}\n\n` +
    `Choose the winner with: /winner challenge_id:${challenge.id} user:@winner`
  );
}

function formatCodeBlock(content: string): string {
  if (content.includes("```")) {
    return content;
  }

  return "```\n" + content + "\n```";
}
