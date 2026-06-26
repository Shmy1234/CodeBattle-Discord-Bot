import { getChallenge } from "../db/challenges.js";
import { retryEvaluationReply } from "./submissionComparison.js";
export async function handleEvaluate(interaction) {
    if (!interaction.guildId) {
        await interaction.reply("Evaluations can only run inside a server.");
        return;
    }
    const challengeId = interaction.options.getString("challenge_id", true).toUpperCase();
    const challenge = await getChallenge(interaction.guildId, challengeId);
    if (!challenge) {
        await interaction.reply(`I could not find challenge ${challengeId} in this server.`);
        return;
    }
    if (interaction.user.id !== challenge.challengerId) {
        await interaction.reply("Only the user who created the challenge can retry its evaluation.");
        return;
    }
    if (challenge.status !== "evaluation_failed") {
        await interaction.reply(`${challenge.id} is not waiting for an evaluation retry.`);
        return;
    }
    await interaction.deferReply();
    await retryEvaluationReply(interaction, challenge);
}
//# sourceMappingURL=evaluate.js.map