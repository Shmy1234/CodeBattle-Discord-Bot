import { getChallenge } from "../db/challenges.js";
import { addSubmission, hasUserSubmitted } from "../db/submissions.js";
import { parseCodeSubmission } from "../evaluation/codeFence.js";
import { replyWithSubmissionResult } from "./submissionComparison.js";
export async function handleSubmit(interaction) {
    if (!interaction.guildId) {
        await interaction.reply("Submissions can only be made inside a server.");
        return;
    }
    const challengeId = interaction.options.getString("challenge_id", true).toUpperCase();
    const answer = interaction.options.getString("answer", true);
    const submission = parseCodeSubmission(answer);
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
    const isParticipant = interaction.user.id === challenge.challengerId ||
        interaction.user.id === challenge.opponentId;
    if (!isParticipant) {
        await interaction.reply("Only the challenger or opponent can submit for this challenge.");
        return;
    }
    if (await hasUserSubmitted(interaction.guildId, challenge.id, interaction.user.id)) {
        await interaction.reply("You have already submitted for this challenge.");
        return;
    }
    if (!submission) {
        await interaction.reply("Submit exactly one fenced `js` or `ts` code block. Unsupported languages and plain text are not accepted.");
        return;
    }
    await interaction.deferReply();
    await addSubmission(interaction.guildId, challenge, {
        userId: interaction.user.id,
        answer: submission.source,
        language: submission.language
    });
    await replyWithSubmissionResult(interaction, challenge);
}
//# sourceMappingURL=submit.js.map