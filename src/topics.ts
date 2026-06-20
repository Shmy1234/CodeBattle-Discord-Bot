export const topics = [
  { name: "Arrays & Hashing", value: "arrays-hashing" },
  { name: "Two Pointers", value: "two-pointers" },
  { name: "Sliding Window", value: "sliding-window" },
  { name: "Stack", value: "stack" },
  { name: "Binary Search", value: "binary-search" },
  { name: "Linked List", value: "linked-list" },
  { name: "Trees", value: "trees" },
  { name: "Tries", value: "tries" },
  { name: "Heap / Priority Queue", value: "heap-priority-queue" },
  { name: "Backtracking", value: "backtracking" },
  { name: "Graphs", value: "graphs" },
  { name: "Advanced Graphs", value: "advanced-graphs" },
  { name: "1-D Dynamic Programming", value: "1d-dynamic-programming" },
  { name: "2-D Dynamic Programming", value: "2d-dynamic-programming" },
  { name: "Greedy", value: "greedy" },
  { name: "Intervals", value: "intervals" },
  { name: "Math & Geometry", value: "math-geometry" },
  { name: "Bit Manipulation", value: "bit-manipulation" }
] as const;

export type Topic = (typeof topics)[number]["value"];

export function isTopic(value: string | null): value is Topic {
  return topics.some((topic) => topic.value === value);
}

export function getTopicName(value: Topic): string {
  return topics.find((topic) => topic.value === value)?.name ?? value;
}
