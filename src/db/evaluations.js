import { supabase } from "../supabase.js";
export async function saveSubmissionEvaluation(guildId, challengeId, evaluation, testSuiteVersion, model) {
    const { error } = await supabase.from("submission_evaluations").upsert({
        challenge_id: challengeId,
        guild_id: guildId,
        user_id: evaluation.userId,
        language: evaluation.language,
        test_suite_version: testSuiteVersion,
        passed_count: evaluation.sandbox.passedCount,
        total_count: evaluation.sandbox.totalCount,
        median_runtime_ms: evaluation.sandbox.medianRuntimeMs,
        peak_memory_kb: evaluation.sandbox.peakMemoryKb,
        estimated_time_complexity: evaluation.ai.estimatedTimeComplexity,
        estimated_space_complexity: evaluation.ai.estimatedSpaceComplexity,
        code_quality_score: evaluation.ai.codeQualityScore,
        correctness_summary: evaluation.ai.correctnessSummary,
        feedback: evaluation.ai.feedback,
        confidence: evaluation.ai.confidence,
        provider: "openrouter",
        model
    }, {
        onConflict: "guild_id,challenge_id,user_id"
    });
    if (error) {
        throw new Error(`Failed to save submission evaluation: ${error.message}`);
    }
}
export async function finalizeChallengeEvaluation(guildId, challengeId, verdict) {
    const { data, error } = await supabase.rpc("finalize_challenge_evaluation", {
        p_guild_id: guildId,
        p_challenge_id: challengeId,
        p_winner_id: verdict.winnerId,
        p_loser_id: verdict.loserId,
        p_reason: verdict.reason,
        p_tie_breaker: verdict.tieBreaker,
        p_test_suite_version: verdict.testSuiteVersion,
        p_provider: verdict.provider,
        p_model: verdict.model
    });
    if (error) {
        throw new Error(`Failed to finalize challenge evaluation: ${error.message}`);
    }
    return data === true;
}
//# sourceMappingURL=evaluations.js.map