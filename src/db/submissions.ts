// Supabase queries for challenge submissions and submission counts.
import { supabase } from "../supabase.js";
import type { Challenge, Submission, SubmissionRow } from "../types.js";

export async function addSubmission(
  guildId: string,
  challenge: Challenge,
  submission: Omit<Submission, "submittedAt">
): Promise<void> {
  const { error: insertError } = await supabase.from("submissions").insert({
    challenge_id: challenge.id,
    guild_id: guildId,
    user_id: submission.userId,
    answer: submission.answer,
    language: submission.language,
    channel_id: submission.channelId,
    message_id: submission.messageId
  });

  if (insertError) {
    throw new Error(`Failed to save submission: ${insertError.message}`);
  }
}

export async function hasUserSubmitted(
  guildId: string,
  challengeId: string,
  userId: string
): Promise<boolean> {
  const { count, error } = await supabase
    .from("submissions")
    .select("id", { count: "exact", head: true })
    .eq("guild_id", guildId)
    .eq("challenge_id", challengeId)
    .eq("user_id", userId);

  if (error) {
    throw new Error(`Failed to check existing submission: ${error.message}`);
  }

  return (count ?? 0) > 0;
}

export async function getChallengeSubmissions(
  guildId: string,
  challengeId: string
): Promise<SubmissionRow[]> {
  const { data, error } = await supabase
    .from("submissions")
    .select("user_id, answer, language, channel_id, message_id, submitted_at")
    .eq("guild_id", guildId)
    .eq("challenge_id", challengeId)
    .order("submitted_at", { ascending: true })
    .returns<SubmissionRow[]>();

  if (error) {
    throw new Error(`Failed to get submissions: ${error.message}`);
  }

  return data ?? [];
}

export async function getSubmissionCount(guildId: string, challengeId: string): Promise<number> {
  const { count, error } = await supabase
    .from("submissions")
    .select("id", { count: "exact", head: true })
    .eq("guild_id", guildId)
    .eq("challenge_id", challengeId);

  if (error) {
    throw new Error(`Failed to count submissions: ${error.message}`);
  }

  return count ?? 0;
}
