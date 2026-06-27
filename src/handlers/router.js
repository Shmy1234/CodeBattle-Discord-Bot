import { handleActive } from "./active.js";
import { handleChallenge } from "./challenge.js";
import { handleChallengeInfo } from "./challengeInfo.js";
import { handleEvaluate } from "./evaluate.js";
import { handleLeaderboard } from "./leaderboard.js";
import { handleSubmit } from "./submit.js";
export async function handleCommand(interaction) {
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
        case "leaderboard":
            await handleLeaderboard(interaction);
            return;
        case "evaluate":
            await handleEvaluate(interaction);
            return;
        case "active":
            await handleActive(interaction);
            return;
        case "challenge-info":
            await handleChallengeInfo(interaction);
            return;
    }
}
//# sourceMappingURL=router.js.map