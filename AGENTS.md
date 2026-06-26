# CodeBattle Discord Bot — Agent Instructions

## Source of truth

This file is the canonical instruction set for agents working in this repository.
`CLAUDE.md` imports it so Claude Code and Codex follow the same rules.

## Project overview

CodeBattle is a TypeScript, ESM Discord slash-command bot. It creates two-player
coding challenges from a local NeetCode-style problem catalogue, stores the
challenge lifecycle in Supabase, accepts submissions, and maintains a
server-scoped leaderboard.

This is not a web application. Do not introduce Next.js, React, Tailwind,
InsForge, or browser-specific conventions unless the requested work explicitly
requires them.

## Read before making a change

1. Read this file and `README.md`.
2. Read `context/project-overview.md`, `context/architecture.md`,
   `context/code-standards.md`, `context/library-docs.md`, and
   `context/progress-tracker.md` in that order. Read the Discord presentation
   files when changing a user-facing response.
3. Read `package.json` and `tsconfig.json` to confirm the available commands and
   compiler settings.
4. Read the files at the seam being changed. For command work, this normally
   means `src/commands.ts`, `src/handlers/router.ts`, the relevant handler, its
   database module, and `supabase/schema.sql` when persistence changes.
5. Read `src/config.ts` before changing configuration or environment variables.

The AI workflow is implemented with LangChain's `ChatOpenAI` client pointed at
OpenRouter's OpenAI-compatible endpoint. It defaults to
`openai/gpt-oss-120b:free`; do not add the OpenRouter SDK unless an integration
requires capabilities unavailable through LangChain.

## Architecture

- `src/index.ts` starts the Discord client and provides the top-level interaction
  error boundary.
- `src/registerCommands.ts` registers the slash-command definitions exported by
  `src/commands.ts`.
- `src/handlers/router.ts` dispatches command names to focused handlers in
  `src/handlers/`.
- `src/db/` is the only layer that performs Supabase queries.
- `src/supabase.ts` exposes the shared Supabase client.
- `src/problems.ts`, `src/problemDetails.ts`, and `src/topics.ts` contain the
  local challenge catalogue and presentation data.
- `src/types.ts` maps Supabase rows to application types.
- `supabase/schema.sql` defines the database schema, constraints, indexes, and
  RLS enablement.

Keep this separation intact. Command handlers should validate Discord input and
orchestrate application behavior; they should not embed raw Supabase queries.

## Command-change checklist

For a new or renamed slash command, update all applicable pieces together:

1. Define the command and its options in `src/commands.ts`.
2. Add a dedicated handler in `src/handlers/`.
3. Route it in `src/handlers/router.ts`.
4. Add or extend a `src/db/` module if it persists data.
5. Run `npm run register` against the intended Discord test guild after the
   command shape changes.

All commands that access challenge, submission, or score data must scope reads
and writes by `guild_id`. Respect the existing challenge lifecycle:
`active` → `submitted` → `completed` (or `cancelled`). Preserve the one
submission per user/challenge constraint.

## TypeScript and data rules

- The repository uses strict TypeScript and NodeNext ESM. Use `.js` extensions
  in relative TypeScript imports, matching the existing source.
- Validate external data at boundaries. Do not cast unvalidated Discord options
  or database strings into domain types.
- Preserve existing participant, ownership, completion, and cancellation checks
  when extending challenge or submission behavior.
- Store secrets only in local environment files. Never hardcode or commit
  Discord tokens, Supabase keys, or OpenRouter keys. Update `.env.example` when a
  required environment variable changes.
- Any schema change belongs in `supabase/schema.sql` and must preserve the
  required constraints and indexes unless the task explicitly changes them.
- RLS is enabled for all current tables. Treat policy changes as security work:
  make the access model explicit and verify the bot's server-side key remains
  appropriate.

## Dependencies and generated output

- Prefer existing dependencies. Before adding a third-party package, confirm
  that the platform API or installed package cannot meet the need, then read the
  package's current documentation.
- Do not manually edit generated `src/**/*.js`, `src/**/*.d.ts`, or source-map
  files. They are TypeScript build artifacts; edit the `.ts` source instead.
- Do not remove or overwrite unrelated uncommitted work. This repository may
  contain user-created skill files, lock files, or build output.

## Verification and workflow

- Run `npm run build` after TypeScript, configuration, or schema-adjacent code
  changes. The project currently has no automated test script; state that fact
  if a change cannot be tested more deeply.
- Use `npm run dev` to run the bot locally only when valid local environment
  variables are available. Do not expose their values in logs or output.
- Use `/architect` before a complex cross-module feature, `/tdd` when adding
  testable behavior, `/review` before a demo or handoff, and `/recover` if the
  same issue persists after one corrective attempt.
- Keep changes focused on the requested task. Document any intentional tradeoff
  or unverified external integration in the final handoff.
- Update `context/progress-tracker.md` after completing a tracked feature. Update
  `context/ui-registry.md` when adding or materially changing a reusable Discord
  response format.
