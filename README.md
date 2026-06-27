# CodeBattle

CodeBattle is a Discord-native bot for head-to-head programming challenges. It gives two server members the same problem, evaluates both solutions, chooses a winner, and maintains a leaderboard for that server.

The entire experience stays inside Discord. Challenges are created with slash commands, solutions are submitted from Discord messages, and results are returned as a detailed CodeBattle AI verdict.

## How a CodeBattle works

1. A member runs `/challenge` and chooses another member, a difficulty, and a topic.
2. CodeBattle selects a supported problem and posts its description, examples, required function name, and Challenge ID.
3. Each participant posts one JavaScript or TypeScript code block and submits its message ID or link with `/submit`.
4. After both submissions arrive, CodeBattle runs each solution against public and hidden tests in a separate isolated sandbox.
5. CodeBattle AI reviews the code, compares both results, posts a verdict, and awards the winner one point.

Only the two participants can submit to a Challenge, and each participant can submit only once.

## Commands

| Command | What it does |
| --- | --- |
| `/ping` | Confirms that CodeBattle is online. |
| `/challenge` | Creates a two-person Challenge with a difficulty and topic. |
| `/submit` | Submits a Discord message containing one fenced `js` or `ts` code block. |
| `/active` | Lists up to ten unfinished Challenges in the current server. |
| `/challenge-info` | Shows a Challenge's participants, problem, status, submission count, and winner. |
| `/leaderboard` | Shows the top ten scores for the current server. |
| `/evaluate` | Lets the Challenge creator retry an evaluation that failed. |

## Submission format

A Submission must be a normal Discord message containing exactly one fenced JavaScript or TypeScript code block and no additional text.

```ts
export function containsDuplicate(nums: number[]): boolean {
  return new Set(nums).size !== nums.length;
}
```

The exported function name must match the function named in the Challenge announcement. `/submit` accepts either the message ID from the current channel or a full Discord message link from the same server.

CodeBattle verifies that the message belongs to the server, was written by the participant submitting it, and contains a supported language tag before storing the source.

## Features and implementation

### Two-player Challenges

`/challenge` rejects bots, self-Challenges, invalid difficulties, and invalid topics. It creates a `CB-...` identifier and stores the participants, selected problem, metadata, and lifecycle state in Supabase.

Problems come from a local NeetCode-style catalogue. The bot currently chooses randomly from the executable test suites available for the selected difficulty.

### Detailed problem prompts

Each Challenge announcement includes local problem details, examples, constraints, and the required function name. Prompts are repository-owned, so the judging contract does not depend on content generated at evaluation time.

### Message-based Submissions

Participants submit code by referencing an existing Discord message. The Discord handler validates the user and message, while the database layer enforces one Submission per user and Challenge.

Only JavaScript and TypeScript are accepted. The parser requires one fenced `js` or `ts` block and rejects unsupported languages, extra prose, missing tags, and malformed message references.

### Isolated code execution

Each Submission runs in its own E2B Node.js sandbox. Internet access is disabled, memory and execution time are limited, and the sandbox is terminated after every run.

The evaluator compiles JavaScript or TypeScript, loads the required function, and runs versioned public and hidden test cases. It records passed tests, median runtime, peak memory, and failed case identifiers.

User code never runs inside the Discord bot process.

### CodeBattle AI evaluation

After sandbox execution, LangChain sends the problem, source code, and measured results to an OpenRouter-hosted model. Zod validates the structured response before it is saved or shown in Discord.

The AI estimates time and space complexity, assigns a code-quality score, and produces concise feedback. Sandbox results remain the source of truth for observed behavior; complexity is clearly treated as an estimate.

### Deterministic winner selection

CodeBattle compares the two Evaluations in this order:

1. Number of canonical tests passed
2. Estimated time complexity
3. Median sandbox runtime
4. Peak sandbox memory
5. AI code-quality score
6. Earlier Submission time as the final tie-breaker

The winner receives one leaderboard point. Supabase finalizes the Challenge, records the Verdict, and increments the score in one database function so a completed Challenge cannot award points twice.

### Server-scoped data

Challenges, Submissions, Evaluations, Verdicts, and scores are stored in Supabase. Every operation is scoped by Discord server ID, keeping each community's Challenges and leaderboard separate.

Raw Supabase queries live in `src/db/`. Discord handlers validate input and coordinate the workflow without directly accessing the database.

### Failure recovery

If sandbox execution, AI output validation, or finalization fails, the Challenge moves to `evaluation_failed` and no point is awarded. The member who created it can retry safely with `/evaluate`.

## Supported problems

CodeBattle currently evaluates these repository-tested problems:

| Difficulty | Problems |
| --- | --- |
| Easy | Contains Duplicate, Valid Anagram, Two Sum |
| Medium | Product of Array Except Self, Valid Sudoku |
| Hard | Trapping Rain Water, Minimum Window Substring, Sliding Window Maximum |

The broader local catalogue is not used for live Challenges until a versioned executable test suite is added for each problem.

## Architecture

```text
Discord interaction
        ↓
Command router and focused handler
        ↓
Guild-scoped Supabase data
        ↓
E2B sandbox tests
        ↓
OpenRouter structured evaluation
        ↓
Atomic Verdict and leaderboard update
```

CodeBattle uses strict TypeScript with NodeNext ESM. `discord.js` handles interactions, Supabase stores state, E2B isolates untrusted code, and LangChain with Zod provides structured OpenRouter evaluation.

## Current limitations

- Topic is collected and displayed, but it does not yet filter problem selection.
- Only the eight listed problems have executable test suites.
- Submissions support JavaScript and TypeScript only.
- Source must come from a Discord message; file attachments are not supported.
- A cancellation state exists in the data model, but there is no cancellation command.
- Evaluation currently uses one AI provider and does not perform multi-model consensus.
