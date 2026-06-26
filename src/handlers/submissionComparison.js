import { claimChallengeEvaluation, markChallengeEvaluationFailed } from "../db/challenges.js";
import { getChallengeSubmissions } from "../db/submissions.js";
import { formatVerdict, runChallengeEvaluation } from "../evaluation/evaluateChallenge.js";
export async function replyWithSubmissionResult(interaction, challenge) {
    if (!interaction.guildId) {
        await interaction.editReply("Submission received.");
        return;
    }
    const submissions = await getChallengeSubmissions(interaction.guildId, challenge.id);
    const participantSubmissions = submissions.filter((submission) => submission.user_id === challenge.challengerId || submission.user_id === challenge.opponentId);
    if (participantSubmissions.length < 2) {
        await interaction.editReply(`Submission received for ${challenge.id} from ${interaction.user}. Waiting for the other player.`);
        return;
    }
    await evaluateAndReply(interaction, challenge, participantSubmissions);
}
export async function retryEvaluationReply(interaction, challenge) {
    if (!interaction.guildId) {
        await interaction.editReply("Evaluations can only run inside a server.");
        return;
    }
    const submissions = await getChallengeSubmissions(interaction.guildId, challenge.id);
    const participantSubmissions = submissions.filter((submission) => submission.user_id === challenge.challengerId || submission.user_id === challenge.opponentId);
    if (participantSubmissions.length !== 2) {
        await interaction.editReply(`${challenge.id} needs submissions from both participants before it can be evaluated.`);
        return;
    }
    await evaluateAndReply(interaction, challenge, participantSubmissions);
}
async function evaluateAndReply(interaction, challenge, submissions) {
    if (!interaction.guildId) {
        return;
    }
    const claimed = await claimChallengeEvaluation(interaction.guildId, challenge.id);
    if (!claimed) {
        await interaction.editReply(`${challenge.id} is already evaluating or has already been completed.`);
        return;
    }
    await interaction.editReply(`Both submissions received for ${challenge.id}. Running isolated tests and AI evaluation…`);
    try {
        const verdict = await runChallengeEvaluation(challenge, submissions);
        await interaction.editReply(formatVerdict(challenge.id, verdict));
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Unknown evaluation failure.";
        await markChallengeEvaluationFailed(interaction.guildId, challenge.id, message);
        await interaction.editReply(`CodeBattle AI could not finish ${challenge.id}. The challenge creator can retry with /evaluate challenge_id:${challenge.id}.`);
    }
}
//# sourceMappingURL=submissionComparison.js.map