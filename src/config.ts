// Centralized environment validation so startup fails fast when secrets are missing.
import "dotenv/config";

function readRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export const config = {
  discordToken: readRequiredEnv("DISCORD_TOKEN"),
  discordClientId: readRequiredEnv("DISCORD_CLIENT_ID"),
  discordGuildId: readRequiredEnv("DISCORD_GUILD_ID"),
  supabaseUrl: readRequiredEnv("SUPABASE_URL"),
  supabaseSecretKey: readRequiredEnv("SUPABASE_SECRET_KEY")
};
