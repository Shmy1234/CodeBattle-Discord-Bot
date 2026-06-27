import { createChallenge } from "../db/challenges.js";
import { codeSubmissionInstruction } from "../evaluation/codeFence.js";
import { getProblemTestSuite } from "../evaluation/testSuites.js";
import { formatProblemDetails } from "../problemDetails.js";
import { isDifficulty, pickProblem } from "../problems.js";
import { getTopicName, isTopic } from "../topics.js";
export async function handleChallenge(interaction) {
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
    const testSuite = getProblemTestSuite(problem);
    if (!testSuite) {
        throw new Error(`No executable test suite is configured for ${problem}.`);
    }
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
    await interaction.reply(`${interaction.user} challenged ${opponent}!\n` +
        `Challenge ID: ${challenge.id}\n` +
        `Status: ${challenge.status}\n` +
        `Difficulty: ${challenge.difficulty}\n` +
        `Topic: ${getTopicName(topic)}\n\n` +
        `Problem: ${challenge.problem}\n` +
        `${problemDetails}\n\n` +
        `${codeSubmissionInstruction(testSuite.functionName)}\n\n` +
        "Post your fenced code block as a normal Discord message, then submit its message link or ID with: " +
        `/submit challenge_id:${challenge.id} message:your-message-link-or-id`);
}
//# sourceMappingURL=challenge.js.map