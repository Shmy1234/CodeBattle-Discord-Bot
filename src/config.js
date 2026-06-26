// Centralized environment validation so startup fails fast when secrets are missing.
import "dotenv/config";
function readRequiredEnv(name) {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
}
function readOptionalEnv(name) {
    const value = process.env[name];
    return value || undefined;
}
export const config = {
    discordToken: readRequiredEnv("DISCORD_TOKEN"),
    discordClientId: readRequiredEnv("DISCORD_CLIENT_ID"),
    discordGuildId: readRequiredEnv("DISCORD_GUILD_ID"),
    supabaseUrl: readRequiredEnv("SUPABASE_URL"),
    supabaseSecretKey: readRequiredEnv("SUPABASE_SECRET_KEY"),
    openRouterApiKey: readOptionalEnv("OPEN_ROUTER_API_KEY") || readOptionalEnv("OPENROUTER_API_KEY"),
    openRouterEvaluationModel: process.env.OPEN_ROUTER_EVALUATION_MODEL || "openai/gpt-oss-120b:free",
    e2bApiKey: readOptionalEnv("E2B_API_KEY"),
    e2bSandboxTemplate: process.env.E2B_SANDBOX_TEMPLATE || "codebattle-node-22"
};
//# sourceMappingURL=config.js.map