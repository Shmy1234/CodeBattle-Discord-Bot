import type { Difficulty } from "../problems.js";
import type { ProblemTestSuite, TestCase } from "./types.js";
export declare function getProblemTestSuite(problem: string): ProblemTestSuite | undefined;
export declare function getTestSuitesForDifficulty(difficulty: Difficulty): ProblemTestSuite[];
export declare function allTestCases(suite: ProblemTestSuite): TestCase[];
export declare function testCaseMatches(suite: ProblemTestSuite, testCase: TestCase, actual: unknown): boolean;
//# sourceMappingURL=testSuites.d.ts.map