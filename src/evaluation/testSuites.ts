import type { Difficulty } from "../problems.js";
import type { ProblemTestSuite, TestCase } from "./types.js";

const version = "2026-06-26.1";

const suites: ProblemTestSuite[] = [
  suite("Contains Duplicate", "easy", "containsDuplicate", "Return true when a number appears at least twice.", "O(n)", "O(n)", [
    test("public-1", [[1, 2, 3, 1]], true),
    test("public-2", [[1, 2, 3, 4]], false)
  ], [
    test("hidden-1", [[]], false),
    test("hidden-2", [[0, -1, 4, 4, 9]], true)
  ]),
  suite("Valid Anagram", "easy", "isAnagram", "Return true when two strings contain the same character counts.", "O(n)", "O(1)", [
    test("public-1", ["anagram", "nagaram"], true),
    test("public-2", ["rat", "car"], false)
  ], [
    test("hidden-1", ["", ""], true),
    test("hidden-2", ["aacc", "ccac"], false)
  ]),
  suite("Two Sum", "easy", "twoSum", "Return two distinct indices whose values add to target.", "O(n)", "O(n)", [
    test("public-1", [[2, 7, 11, 15], 9], null),
    test("public-2", [[3, 2, 4], 6], null)
  ], [
    test("hidden-1", [[3, 3], 6], null),
    test("hidden-2", [[-3, 4, 3, 90], 0], null)
  ], "two-sum"),
  suite("Product of Array Except Self", "medium", "productExceptSelf", "Return products of every value except the value at each index.", "O(n)", "O(1)", [
    test("public-1", [[1, 2, 3, 4]], [24, 12, 8, 6]),
    test("public-2", [[-1, 1, 0, -3, 3]], [0, 0, 9, 0, 0])
  ], [
    test("hidden-1", [[2, 3]], [3, 2]),
    test("hidden-2", [[0, 4, 0]], [0, 0, 0])
  ]),
  suite("Valid Sudoku", "medium", "isValidSudoku", "Return true when a partially filled Sudoku board has no duplicate row, column, or box values.", "O(1)", "O(1)", [
    test("public-1", [validSudokuBoard()], true),
    test("public-2", [invalidSudokuBoard()], false)
  ], [
    test("hidden-1", [emptySudokuBoard()], true),
    test("hidden-2", [duplicateColumnSudokuBoard()], false)
  ]),
  suite("Trapping Rain Water", "hard", "trap", "Return the total trapped rain water for an elevation map.", "O(n)", "O(1)", [
    test("public-1", [[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]], 6),
    test("public-2", [[4, 2, 0, 3, 2, 5]], 9)
  ], [
    test("hidden-1", [[]], 0),
    test("hidden-2", [[1, 2, 3, 4]], 0)
  ]),
  suite("Minimum Window Substring", "hard", "minWindow", "Return the shortest substring of s containing all characters of t.", "O(n)", "O(1)", [
    test("public-1", ["ADOBECODEBANC", "ABC"], "BANC"),
    test("public-2", ["a", "a"], "a")
  ], [
    test("hidden-1", ["a", "aa"], ""),
    test("hidden-2", ["aa", "aa"], "aa")
  ]),
  suite("Sliding Window Maximum", "hard", "maxSlidingWindow", "Return each sliding-window maximum in order.", "O(n)", "O(n)", [
    test("public-1", [[1, 3, -1, -3, 5, 3, 6, 7], 3], [3, 3, 5, 5, 6, 7]),
    test("public-2", [[1], 1], [1])
  ], [
    test("hidden-1", [[9, 11], 2], [11]),
    test("hidden-2", [[4, -2], 1], [4, -2])
  ])
];

export function getProblemTestSuite(problem: string): ProblemTestSuite | undefined {
  return suites.find((suite) => suite.problem === problem);
}

export function getTestSuitesForDifficulty(difficulty: Difficulty): ProblemTestSuite[] {
  return suites.filter((suite) => suite.difficulty === difficulty);
}

export function allTestCases(suite: ProblemTestSuite): TestCase[] {
  return [...suite.publicCases, ...suite.hiddenCases];
}

export function testCaseMatches(suite: ProblemTestSuite, testCase: TestCase, actual: unknown): boolean {
  if (suite.matcher === "two-sum") {
    if (!Array.isArray(actual) || actual.length !== 2 || !actual.every(Number.isInteger)) {
      return false;
    }

    const [firstIndex, secondIndex] = actual;
    const [numbers, target] = testCase.args as [number[], number];
    const firstValue = numbers[firstIndex];
    const secondValue = numbers[secondIndex];
    return firstIndex !== secondIndex &&
      firstIndex >= 0 && secondIndex >= 0 &&
      firstIndex < numbers.length && secondIndex < numbers.length &&
      firstValue !== undefined && secondValue !== undefined &&
      firstValue + secondValue === target;
  }

  return JSON.stringify(actual) === JSON.stringify(testCase.expected);
}

function suite(
  problem: string,
  difficulty: Difficulty,
  functionName: string,
  description: string,
  expectedTimeComplexity: ProblemTestSuite["expectedTimeComplexity"],
  expectedSpaceComplexity: ProblemTestSuite["expectedSpaceComplexity"],
  publicCases: TestCase[],
  hiddenCases: TestCase[],
  matcher: ProblemTestSuite["matcher"] = "deep-equal"
): ProblemTestSuite {
  return {
    problem,
    difficulty,
    functionName,
    description,
    expectedTimeComplexity,
    expectedSpaceComplexity,
    publicCases,
    hiddenCases,
    matcher,
    version
  };
}

function test(id: string, args: unknown[], expected: unknown): TestCase {
  return { id, args, expected };
}

function validSudokuBoard(): string[][] {
  return [
    ["5", "3", ".", ".", "7", ".", ".", ".", "."],
    ["6", ".", ".", "1", "9", "5", ".", ".", "."],
    [".", "9", "8", ".", ".", ".", ".", "6", "."],
    ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
    ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
    ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
    [".", "6", ".", ".", ".", ".", "2", "8", "."],
    [".", ".", ".", "4", "1", "9", ".", ".", "5"],
    [".", ".", ".", ".", "8", ".", ".", "7", "9"]
  ];
}

function invalidSudokuBoard(): string[][] {
  const board = validSudokuBoard();
  board[0]![1] = "5";
  return board;
}

function duplicateColumnSudokuBoard(): string[][] {
  const board = emptySudokuBoard();
  board[0]![0] = "1";
  board[1]![0] = "1";
  return board;
}

function emptySudokuBoard(): string[][] {
  return Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => "."));
}
