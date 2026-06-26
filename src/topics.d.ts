export declare const topics: readonly [{
    readonly name: "Arrays & Hashing";
    readonly value: "arrays-hashing";
}, {
    readonly name: "Two Pointers";
    readonly value: "two-pointers";
}, {
    readonly name: "Sliding Window";
    readonly value: "sliding-window";
}, {
    readonly name: "Stack";
    readonly value: "stack";
}, {
    readonly name: "Binary Search";
    readonly value: "binary-search";
}, {
    readonly name: "Linked List";
    readonly value: "linked-list";
}, {
    readonly name: "Trees";
    readonly value: "trees";
}, {
    readonly name: "Tries";
    readonly value: "tries";
}, {
    readonly name: "Heap / Priority Queue";
    readonly value: "heap-priority-queue";
}, {
    readonly name: "Backtracking";
    readonly value: "backtracking";
}, {
    readonly name: "Graphs";
    readonly value: "graphs";
}, {
    readonly name: "Advanced Graphs";
    readonly value: "advanced-graphs";
}, {
    readonly name: "1-D Dynamic Programming";
    readonly value: "1d-dynamic-programming";
}, {
    readonly name: "2-D Dynamic Programming";
    readonly value: "2d-dynamic-programming";
}, {
    readonly name: "Greedy";
    readonly value: "greedy";
}, {
    readonly name: "Intervals";
    readonly value: "intervals";
}, {
    readonly name: "Math & Geometry";
    readonly value: "math-geometry";
}, {
    readonly name: "Bit Manipulation";
    readonly value: "bit-manipulation";
}];
export type Topic = (typeof topics)[number]["value"];
export declare function isTopic(value: string | null): value is Topic;
export declare function getTopicName(value: Topic): string;
//# sourceMappingURL=topics.d.ts.map