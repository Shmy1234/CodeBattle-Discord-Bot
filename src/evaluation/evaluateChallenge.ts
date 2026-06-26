import { finalizeChallengeEvaluation, saveSubmissionEvaluation } from "../db/evaluations.js";
import { config } from "../config.js";
import type { Challenge, SubmissionRow } from "../types.js";
import { evaluateSourceWithOpenRouter, complexityRank } from "./aiJudge.js";
import { evaluateSubmissionInSandbox } from "./sandbox.js";
import { getProblemTestSuite } from "./testSuites.js";
import type { ChallengeVerdict, SubmissionEvaluation } from "./types.js";

export async function runChallengeEvaluation(
  challenge: Challenge,
  submissions: SubmissionRow[]
): Promise<ChallengeVerdict> {
  const suite = getProblemTestSuite(challenge.problem);

  if (!suite) {
    throw new Error(`No executable test suite is configured for ${challenge.problem}.`);
  }

  const participantSubmissions = submissions.filter((submission) =>
    submission.user_id === challenge.challengerId || submission.user_id === challenge.opponentId
  );

  if (participantSubmissions.length !== 2) {
    throw new Error("Both challenge participants must submit before evaluation can start.");
  }

  const evaluations = await Promise.all(participantSubmissions.map(async (submission) => {
    const sandbox = await evaluateSubmissionInSandbox(suite, submission.language, submission.answer);
    const ai = await evaluateSourceWithOpenRouter(suite, submission.language, submission.answer, sandbox);

    return {
      userId: submission.user_id,
      language: submission.language,
      sandbox,
      ai
    } satisfies SubmissionEvaluation;
  }));

  await Promise.all(evaluations.map((evaluation) =>
    saveSubmissionEvaluation(
      challenge.guildId,
      challenge.id,
      evaluation,
      suite.version,
      modelName()
    )
  ));

  const verdict = createVerdict(challenge, participantSubmissions, evaluations, suite.version);
  const finalized = await finalizeChallengeEvaluation(challenge.guildId, challenge.id, verdict);

  if (!finalized) {
    throw new Error("The challenge was already finalized or is no longer evaluating.");
  }

  return verdict;
}

export function formatVerdict(challengeId: string, verdict: ChallengeVerdict): string {
  const winner = verdict.winnerEvaluation;
  const loser = verdict.loserEvaluation;

  return [
    `CodeBattle AI verdict — ${challengeId}`,
    `Winner: <@${verdict.winnerId}> (+1 point)`,
    "",
    formatEvaluation(winner),
    "",
    formatEvaluation(loser),
    "",
    `Decision: ${verdict.reason}`,
    verdict.tieBreaker ? `Tie-breaker: ${verdict.tieBreaker}` : ""
  ].filter(Boolean).join("\n").slice(0, 1_900);
}

function createVerdict(
  challenge: Challenge,
  submissions: SubmissionRow[],
  evaluations: SubmissionEvaluation[],
  testSuiteVersion: string
): ChallengeVerdict {
  const [first, second] = evaluations;
  const [firstSubmission, secondSubmission] = submissions;
  const comparison = compareEvaluations(first!, second!, firstSubmission!, secondSubmission!);
  const winner = comparison.winner === "first" ? first! : second!;
  const loser = comparison.winner === "first" ? second! : first!;

  return {
    winnerId: winner.userId,
    loserId: loser.userId,
    reason: comparison.reason,
    tieBreaker: comparison.tieBreaker,
    testSuiteVersion,
    provider: "openrouter",
    model: modelName(),
    winnerEvaluation: winner,
    loserEvaluation: loser
  };
}

function compareEvaluations(
  first: SubmissionEvaluation,
  second: SubmissionEvaluation,
  firstSubmission: SubmissionRow,
  secondSubmission: SubmissionRow
): { winner: "first" | "second"; reason: string; tieBreaker: string | null } {
  const testDifference = first.sandbox.passedCount - second.sandbox.passedCount;

  if (testDifference !== 0) {
    return testDifference > 0
      ? { winner: "first", reason: "It passed more canonical test cases.", tieBreaker: null }
      : { winner: "second", reason: "It passed more canonical test cases.", tieBreaker: null };
  }

  const complexityDifference = complexityRank(first.ai.estimatedTimeComplexity) - complexityRank(second.ai.estimatedTimeComplexity);

  if (complexityDifference !== 0) {
    return complexityDifference < 0
      ? { winner: "first", reason: "It has the lower estimated time complexity.", tieBreaker: null }
      : { winner: "second", reason: "It has the lower estimated time complexity.", tieBreaker: null };
  }

  const runtimeDifference = first.sandbox.medianRuntimeMs - second.sandbox.medianRuntimeMs;

  if (Math.abs(runtimeDifference) > 0.01) {
    return runtimeDifference < 0
      ? { winner: "first", reason: "It had the lower median sandbox runtime.", tieBreaker: null }
      : { winner: "second", reason: "It had the lower median sandbox runtime.", tieBreaker: null };
  }

  const memoryDifference = first.sandbox.peakMemoryKb - second.sandbox.peakMemoryKb;

  if (memoryDifference !== 0) {
    return memoryDifference < 0
      ? { winner: "first", reason: "It used less peak sandbox memory.", tieBreaker: null }
      : { winner: "second", reason: "It used less peak sandbox memory.", tieBreaker: null };
  }

  const qualityDifference = first.ai.codeQualityScore - second.ai.codeQualityScore;

  if (qualityDifference !== 0) {
    return qualityDifference > 0
      ? { winner: "first", reason: "It received the higher model code-quality score.", tieBreaker: null }
      : { winner: "second", reason: "It received the higher model code-quality score.", tieBreaker: null };
  }

  const firstSubmittedAt = Date.parse(firstSubmission.submitted_at);
  const secondSubmittedAt = Date.parse(secondSubmission.submitted_at);
  const winner = firstSubmittedAt <= secondSubmittedAt ? "first" : "second";

  return {
    winner,
    reason: "Both submissions were tied on tests, complexity, runtime, memory, and code quality.",
    tieBreaker: "Earlier submitted solution wins a complete tie."
  };
}

function formatEvaluation(evaluation: SubmissionEvaluation): string {
  return [
    `<@${evaluation.userId}>`,
    `Tests: ${evaluation.sandbox.passedCount}/${evaluation.sandbox.totalCount}`,
    `Estimated time: ${evaluation.ai.estimatedTimeComplexity}`,
    `Estimated space: ${evaluation.ai.estimatedSpaceComplexity}`,
    `Median runtime: ${evaluation.sandbox.medianRuntimeMs.toFixed(3)} ms`,
    `Peak memory: ${evaluation.sandbox.peakMemoryKb} KB`,
    `Code quality: ${evaluation.ai.codeQualityScore.toFixed(1)}/10`,
    `Feedback: ${evaluation.ai.feedback.join(" ")}`
  ].join("\n");
}

function modelName(): string {
  return config.openRouterEvaluationModel;
}
