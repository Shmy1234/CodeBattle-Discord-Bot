// Shared application types that map Discord and Supabase data into bot-friendly shapes.
import type { Difficulty } from "./problems.js";

export type ChallengeStatus = "active" | "submitted" | "completed" | "cancelled";

export type Submission = {
  userId: string;
  answer: string;
  submittedAt: Date;
  channelId?: string;
  messageId?: string;
};

export type Challenge = {
  id: string;
  guildId: string;
  challengerId: string;
  opponentId: string;
  difficulty: Difficulty;
  topic: string;
  problem: string;
  status: ChallengeStatus;
  winnerId: string | null;
  createdAt: string;
};

export type ChallengeRow = {
  id: string;
  guild_id: string;
  challenger_id: string;
  opponent_id: string;
  difficulty: string;
  topic: string;
  problem: string;
  status: string;
  winner_id: string | null;
  created_at: string;
};

export type ScoreRow = {
  user_id: string;
  points: number;
};

export type SubmissionRow = {
  user_id: string;
  answer: string;
  channel_id: string | null;
  message_id: string | null;
  submitted_at: string;
};
