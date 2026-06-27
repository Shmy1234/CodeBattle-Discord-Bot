# CodeBattle Discord Bot

CodeBattle runs server-scoped, two-player programming challenges in Discord.
The current AI workflow accepts JavaScript/TypeScript code blocks, executes them
in E2B's isolated no-network sandbox against repository-owned tests, asks
OpenRouter's `openai/gpt-oss-120b:free` model for structured feedback through
LangChain.js, and automatically awards the
winner one leaderboard point.

## Setup

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env` and provide Discord, Supabase, OpenRouter, and
   E2B credentials. `OPEN_ROUTER_EVALUATION_MODEL` defaults to
   `openai/gpt-oss-120b:free`.
3. Apply [supabase/schema.sql](./supabase/schema.sql) to the target Supabase
   project. It creates the evaluation tables and atomic finalization function.
4. Build the managed Node 22 sandbox template once with:

   ```bash
   npm run build:sandbox-template
   ```

   The command uses `E2B_API_KEY` and the name in `E2B_SANDBOX_TEMPLATE`.
5. Register slash commands with `npm run register`.
6. Start the bot with `npm run dev`.

## Submission contract

Post one code block tagged `js` or `ts` as a normal Discord message. The
function name is specified when the bot creates the challenge. For example:

```ts
export function containsDuplicate(nums: number[]): boolean {
  return new Set(nums).size !== nums.length;
}
```

Then run `/submit` with the Challenge ID and either the message's ID (when it
is in the current channel) or its full Discord message link. The bot only
accepts a message written by the submitting Challenge participant, from the
same Discord server, with no text outside its one fenced code block.

Enable **Message Content Intent** in the Discord Developer Portal's Bot page.
The bot also needs **View Channel** and **Read Message History** permission in
every channel from which users can submit code.

The bot currently provides executable public and hidden test suites for:

- Easy: Contains Duplicate, Valid Anagram, Two Sum
- Medium: Product of Array Except Self, Valid Sudoku
- Hard: Trapping Rain Water, Minimum Window Substring, Sliding Window Maximum

The problem picker limits AI-evaluated challenges to this supported set. Add a
versioned test suite before enabling another problem.

## Safety and scoring

- User code never runs in the bot process.
- Each Submission runs in a separate E2B sandbox with outbound internet disabled.
- The sandbox returns test results, median execution time, and peak memory.
- Winner selection compares passed tests, estimated time complexity, measured
  runtime, memory, code quality, then earliest submission as the final tie-breaker.
- If execution, structured model output, or finalization fails, no points are
  awarded. The challenge creator can use `/evaluate` to retry.
