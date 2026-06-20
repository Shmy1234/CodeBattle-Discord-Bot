// Original prompt summaries and examples for the local NeetCode 150 title list.
export type ProblemDetails = {
  description: string;
  examples: string[];
};

export const problemDetails: Record<string, ProblemDetails> = {
  "Contains Duplicate": {
    description: "Given an integer array, determine whether any value appears at least twice.",
    examples: ["Input: [1,2,3,1] -> Output: true"]
  },
  "Valid Anagram": {
    description: "Given two strings, determine whether they contain the same characters with the same counts.",
    examples: ["Input: s='listen', t='silent' -> Output: true"]
  },
  "Two Sum": {
    description: "Given numbers and a target, return two different indices whose values add to the target.",
    examples: ["Input: nums=[2,7,11,15], target=9 -> Output: [0,1]"]
  },
  "Valid Palindrome": {
    description: "Determine whether a string reads the same forward and backward after ignoring casing and non-alphanumeric characters.",
    examples: ["Input: 'A man, a plan, a canal: Panama' -> Output: true"]
  },
  "Best Time to Buy and Sell Stock": {
    description: "Given daily stock prices, find the maximum profit from one buy followed by one sell.",
    examples: ["Input: [7,1,5,3,6,4] -> Output: 5"]
  },
  "Valid Parentheses": {
    description: "Check whether every opening bracket in a string is closed by the correct bracket in the correct order.",
    examples: ["Input: '({[]})' -> Output: true"]
  },
  "Binary Search": {
    description: "Search for a target in a sorted array and return its index, or -1 if it is missing.",
    examples: ["Input: nums=[-1,0,3,5,9], target=9 -> Output: 4"]
  },
  "Reverse Linked List": {
    description: "Reverse a singly linked list and return the new head.",
    examples: ["Input: 1->2->3 -> Output: 3->2->1"]
  },
  "Merge Two Sorted Lists": {
    description: "Merge two sorted linked lists into one sorted linked list.",
    examples: ["Input: 1->3 and 2->4 -> Output: 1->2->3->4"]
  },
  "Linked List Cycle": {
    description: "Determine whether a linked list contains a cycle.",
    examples: ["Input: 1->2->3 with 3 pointing back to 2 -> Output: true"]
  },
  "Invert Binary Tree": {
    description: "Swap the left and right child of every node in a binary tree.",
    examples: ["Input: root=[4,2,7,1,3,6,9] -> Output: [4,7,2,9,6,3,1]"]
  },
  "Maximum Depth of Binary Tree": {
    description: "Find the number of nodes on the longest path from the root to a leaf.",
    examples: ["Input: root=[3,9,20,null,null,15,7] -> Output: 3"]
  },
  "Diameter of Binary Tree": {
    description: "Find the length of the longest path between any two nodes in a binary tree.",
    examples: ["Input: root=[1,2,3,4,5] -> Output: 3"]
  },
  "Balanced Binary Tree": {
    description: "Determine whether every node's left and right subtree heights differ by at most one.",
    examples: ["Input: root=[3,9,20,null,null,15,7] -> Output: true"]
  },
  "Same Tree": {
    description: "Determine whether two binary trees have identical structure and values.",
    examples: ["Input: p=[1,2,3], q=[1,2,3] -> Output: true"]
  },
  "Subtree of Another Tree": {
    description: "Determine whether one binary tree appears as a complete subtree of another.",
    examples: ["Input: root=[3,4,5,1,2], subRoot=[4,1,2] -> Output: true"]
  },
  "Lowest Common Ancestor of a Binary Search Tree": {
    description: "Find the lowest node in a BST that has both given nodes in its subtree.",
    examples: ["Input: root=[6,2,8,0,4,7,9], p=2, q=8 -> Output: 6"]
  },
  "Kth Largest Element in a Stream": {
    description: "Design a structure that returns the kth largest value after each new number is added.",
    examples: ["Input: k=3, nums=[4,5,8,2], add(3) -> Output: 4"]
  },
  "Last Stone Weight": {
    description: "Repeatedly smash the two heaviest stones and return the final remaining weight, or 0.",
    examples: ["Input: [2,7,4,1,8,1] -> Output: 1"]
  },
  "Climbing Stairs": {
    description: "Count how many distinct ways you can reach the top when each move is 1 or 2 steps.",
    examples: ["Input: n=4 -> Output: 5"]
  },
  "Min Cost Climbing Stairs": {
    description: "Find the minimum cost to reach the top when each step has a cost.",
    examples: ["Input: cost=[10,15,20] -> Output: 15"]
  },
  "Meeting Rooms": {
    description: "Given meeting intervals, determine whether one person can attend all meetings.",
    examples: ["Input: [[0,30],[5,10],[15,20]] -> Output: false"]
  },
  "Happy Number": {
    description: "Repeatedly replace a number by the sum of squared digits and determine whether it reaches 1.",
    examples: ["Input: n=19 -> Output: true"]
  },
  "Plus One": {
    description: "Given digits of a non-negative integer, add one and return the resulting digits.",
    examples: ["Input: [1,2,9] -> Output: [1,3,0]"]
  },
  "Single Number": {
    description: "Find the only number that appears once when every other number appears twice.",
    examples: ["Input: [4,1,2,1,2] -> Output: 4"]
  },
  "Number of 1 Bits": {
    description: "Count how many set bits are in the binary representation of an integer.",
    examples: ["Input: 11 (1011) -> Output: 3"]
  },
  "Counting Bits": {
    description: "For every number from 0 to n, return the number of set bits.",
    examples: ["Input: n=5 -> Output: [0,1,1,2,1,2]"]
  },
  "Reverse Bits": {
    description: "Reverse the 32-bit binary representation of an unsigned integer.",
    examples: ["Input: 00000010100101000001111010011100 -> Output: 964176192"]
  },
  "Missing Number": {
    description: "Given n unique numbers from the range 0..n, find the missing value.",
    examples: ["Input: [3,0,1] -> Output: 2"]
  },
  "Group Anagrams": {
    description: "Group strings that are anagrams of each other.",
    examples: ["Input: ['eat','tea','tan','ate'] -> Output: groups containing ['eat','tea','ate'] and ['tan']"]
  },
  "Top K Frequent Elements": {
    description: "Return the k values that appear most often in an array.",
    examples: ["Input: nums=[1,1,1,2,2,3], k=2 -> Output: [1,2]"]
  },
  "Encode and Decode Strings": {
    description: "Design a reversible way to encode a list of strings into one string and decode it back.",
    examples: ["Input: ['leet','code'] -> Encoded string -> Output after decode: ['leet','code']"]
  },
  "Product of Array Except Self": {
    description: "Return an array where each position contains the product of all other values.",
    examples: ["Input: [1,2,3,4] -> Output: [24,12,8,6]"]
  },
  "Valid Sudoku": {
    description: "Determine whether a partially filled 9x9 Sudoku board is valid.",
    examples: ["Input: board with no repeated row, column, or box digits -> Output: true"]
  },
  "Longest Consecutive Sequence": {
    description: "Find the length of the longest run of consecutive integers in an unsorted array.",
    examples: ["Input: [100,4,200,1,3,2] -> Output: 4"]
  },
  "Two Sum II Input Array Is Sorted": {
    description: "Given a sorted array, find two 1-based indices whose values add to the target.",
    examples: ["Input: numbers=[2,7,11,15], target=9 -> Output: [1,2]"]
  },
  "3Sum": {
    description: "Return all unique triplets in an array that sum to zero.",
    examples: ["Input: [-1,0,1,2,-1,-4] -> Output includes [-1,-1,2] and [-1,0,1]"]
  },
  "Container With Most Water": {
    description: "Choose two vertical lines that can hold the most water with the x-axis.",
    examples: ["Input: [1,8,6,2,5,4,8,3,7] -> Output: 49"]
  },
  "Longest Substring Without Repeating Characters": {
    description: "Find the length of the longest substring with no repeated characters.",
    examples: ["Input: 'abcabcbb' -> Output: 3"]
  },
  "Longest Repeating Character Replacement": {
    description: "Find the longest substring that can be made of one repeated character after at most k replacements.",
    examples: ["Input: s='AABABBA', k=1 -> Output: 4"]
  },
  "Permutation in String": {
    description: "Determine whether one string contains a permutation of another as a substring.",
    examples: ["Input: s1='ab', s2='eidbaooo' -> Output: true"]
  },
  "Min Stack": {
    description: "Design a stack that supports push, pop, top, and retrieving the minimum in constant time.",
    examples: ["Input: push -2, push 0, push -3, getMin() -> Output: -3"]
  },
  "Evaluate Reverse Polish Notation": {
    description: "Evaluate an arithmetic expression written in postfix notation.",
    examples: ["Input: ['2','1','+','3','*'] -> Output: 9"]
  },
  "Generate Parentheses": {
    description: "Generate all valid combinations of n pairs of parentheses.",
    examples: ["Input: n=3 -> Output includes '((()))', '(()())', '(())()'"]
  },
  "Daily Temperatures": {
    description: "For each day, return how many days until a warmer temperature occurs.",
    examples: ["Input: [73,74,75,71,69,72,76,73] -> Output: [1,1,4,2,1,1,0,0]"]
  },
  "Car Fleet": {
    description: "Count how many car fleets arrive at the target when faster cars may catch slower cars.",
    examples: ["Input: target=12, position=[10,8,0,5,3], speed=[2,4,1,1,3] -> Output: 3"]
  },
  "Search a 2D Matrix": {
    description: "Search a matrix where each row is sorted and each row starts after the previous row.",
    examples: ["Input: matrix=[[1,3,5],[7,9,11]], target=9 -> Output: true"]
  },
  "Koko Eating Bananas": {
    description: "Find the minimum integer eating speed needed to finish all piles within h hours.",
    examples: ["Input: piles=[3,6,7,11], h=8 -> Output: 4"]
  },
  "Find Minimum in Rotated Sorted Array": {
    description: "Find the minimum value in a sorted array that was rotated.",
    examples: ["Input: [3,4,5,1,2] -> Output: 1"]
  },
  "Search in Rotated Sorted Array": {
    description: "Search for a target in a rotated sorted array and return its index.",
    examples: ["Input: nums=[4,5,6,7,0,1,2], target=0 -> Output: 4"]
  },
  "Time Based Key-Value Store": {
    description: "Design a key-value store that can return values for a key at a requested timestamp.",
    examples: ["Input: set('foo','bar',1), get('foo',1) -> Output: 'bar'"]
  },
  "Reorder List": {
    description: "Reorder a linked list from L0->L1->...->Ln into L0->Ln->L1->Ln-1...",
    examples: ["Input: 1->2->3->4 -> Output: 1->4->2->3"]
  },
  "Remove Nth Node From End of List": {
    description: "Remove the nth node from the end of a linked list.",
    examples: ["Input: 1->2->3->4->5, n=2 -> Output: 1->2->3->5"]
  },
  "Copy List with Random Pointer": {
    description: "Deep copy a linked list where each node has next and random pointers.",
    examples: ["Input: nodes with next/random links -> Output: independent copied list with same links"]
  },
  "Add Two Numbers": {
    description: "Add two non-negative integers represented by reversed linked lists.",
    examples: ["Input: 2->4->3 plus 5->6->4 -> Output: 7->0->8"]
  },
  "Find the Duplicate Number": {
    description: "Find the repeated value in an array containing n+1 numbers in the range 1..n.",
    examples: ["Input: [1,3,4,2,2] -> Output: 2"]
  },
  "LRU Cache": {
    description: "Design a cache with get and put that evicts the least recently used key when full.",
    examples: ["Input: capacity=2, put(1,1), put(2,2), get(1) -> Output: 1"]
  },
  "Binary Tree Level Order Traversal": {
    description: "Return the values of a binary tree level by level from top to bottom.",
    examples: ["Input: root=[3,9,20,null,null,15,7] -> Output: [[3],[9,20],[15,7]]"]
  },
  "Binary Tree Right Side View": {
    description: "Return the node values visible when viewing a binary tree from the right side.",
    examples: ["Input: root=[1,2,3,null,5,null,4] -> Output: [1,3,4]"]
  },
  "Count Good Nodes in Binary Tree": {
    description: "Count nodes whose value is not smaller than any previous value on the root-to-node path.",
    examples: ["Input: root=[3,1,4,3,null,1,5] -> Output: 4"]
  },
  "Validate Binary Search Tree": {
    description: "Determine whether a binary tree satisfies strict BST ordering rules.",
    examples: ["Input: root=[2,1,3] -> Output: true"]
  },
  "Kth Smallest Element in a BST": {
    description: "Find the kth smallest value in a binary search tree.",
    examples: ["Input: root=[3,1,4,null,2], k=1 -> Output: 1"]
  },
  "Construct Binary Tree from Preorder and Inorder Traversal": {
    description: "Rebuild a binary tree from its preorder and inorder traversals.",
    examples: ["Input: preorder=[3,9,20,15,7], inorder=[9,3,15,20,7] -> Output: rebuilt tree"]
  },
  "Implement Trie Prefix Tree": {
    description: "Design a trie supporting insert, full-word search, and prefix search.",
    examples: ["Input: insert('apple'), search('apple'), startsWith('app') -> Output: true, true"]
  },
  "Design Add and Search Words Data Structure": {
    description: "Design a word dictionary where search supports '.' as a wildcard character.",
    examples: ["Input: addWord('bad'), search('.ad') -> Output: true"]
  },
  "K Closest Points to Origin": {
    description: "Return the k points with the smallest distance from the origin.",
    examples: ["Input: points=[[1,3],[-2,2]], k=1 -> Output: [[-2,2]]"]
  },
  "Kth Largest Element in an Array": {
    description: "Find the kth largest value in an unsorted array.",
    examples: ["Input: nums=[3,2,1,5,6,4], k=2 -> Output: 5"]
  },
  "Task Scheduler": {
    description: "Find the least time needed to execute tasks with cooldown between identical tasks.",
    examples: ["Input: tasks=['A','A','A','B','B','B'], n=2 -> Output: 8"]
  },
  "Design Twitter": {
    description: "Design a simplified social feed with posting, following, unfollowing, and news feed retrieval.",
    examples: ["Input: postTweet(1,5), getNewsFeed(1) -> Output: [5]"]
  },
  "Subsets": {
    description: "Return all possible subsets of a list of unique numbers.",
    examples: ["Input: [1,2,3] -> Output includes [], [1], [1,2,3]"]
  },
  "Combination Sum": {
    description: "Find combinations that sum to a target, allowing candidates to be reused.",
    examples: ["Input: candidates=[2,3,6,7], target=7 -> Output: [[2,2,3],[7]]"]
  },
  "Permutations": {
    description: "Return all possible orderings of the given unique numbers.",
    examples: ["Input: [1,2,3] -> Output includes [1,2,3], [1,3,2]"]
  },
  "Subsets II": {
    description: "Return all unique subsets when the input may contain duplicate numbers.",
    examples: ["Input: [1,2,2] -> Output includes [], [2], [2,2], [1,2]"]
  },
  "Combination Sum II": {
    description: "Find unique combinations that sum to target, using each candidate at most once.",
    examples: ["Input: candidates=[10,1,2,7,6,1,5], target=8 -> Output includes [1,1,6], [1,7]"]
  },
  "Word Search": {
    description: "Determine whether a word can be formed by adjacent cells in a grid without reusing cells.",
    examples: ["Input: board=[['A','B'],['C','D']], word='ABCD' -> Output depends on valid path"]
  },
  "Palindrome Partitioning": {
    description: "Split a string into all possible lists where every substring is a palindrome.",
    examples: ["Input: 'aab' -> Output: [['a','a','b'],['aa','b']]"]
  },
  "Letter Combinations of a Phone Number": {
    description: "Return all letter strings represented by a digit string using phone keypad mapping.",
    examples: ["Input: digits='23' -> Output includes 'ad', 'ae', 'bd'"]
  },
  "Number of Islands": {
    description: "Count connected groups of land cells in a grid.",
    examples: ["Input: grid with two separated land groups -> Output: 2"]
  },
  "Clone Graph": {
    description: "Create a deep copy of an undirected graph starting from a given node.",
    examples: ["Input: 1 connected to 2 and 4 -> Output: copied graph with same connections"]
  },
  "Max Area of Island": {
    description: "Find the largest connected land area in a grid.",
    examples: ["Input: grid with island sizes 3 and 5 -> Output: 5"]
  },
  "Pacific Atlantic Water Flow": {
    description: "Find cells from which water can flow to both ocean borders under height rules.",
    examples: ["Input: heights matrix -> Output: coordinates that can reach both oceans"]
  },
  "Surrounded Regions": {
    description: "Capture regions of O cells that are fully surrounded by X cells.",
    examples: ["Input: board with enclosed O region -> Output: enclosed O cells changed to X"]
  },
  "Rotting Oranges": {
    description: "Find minutes needed for rotten oranges to spread to all fresh oranges, or -1 if impossible.",
    examples: ["Input: [[2,1,1],[1,1,0],[0,1,1]] -> Output: 4"]
  },
  "Walls and Gates": {
    description: "Fill each empty room with its distance to the nearest gate.",
    examples: ["Input: rooms with INF, -1, and 0 -> Output: INF cells replaced by nearest gate distance"]
  },
  "Course Schedule": {
    description: "Determine whether all courses can be finished given prerequisite pairs.",
    examples: ["Input: numCourses=2, prerequisites=[[1,0]] -> Output: true"]
  },
  "Course Schedule II": {
    description: "Return an order to complete courses given prerequisites, or an empty list if impossible.",
    examples: ["Input: numCourses=2, prerequisites=[[1,0]] -> Output: [0,1]"]
  },
  "Redundant Connection": {
    description: "Find the edge that can be removed so an undirected graph becomes a tree.",
    examples: ["Input: [[1,2],[1,3],[2,3]] -> Output: [2,3]"]
  },
  "Number of Connected Components in an Undirected Graph": {
    description: "Count connected components in an undirected graph with n nodes.",
    examples: ["Input: n=5, edges=[[0,1],[1,2],[3,4]] -> Output: 2"]
  },
  "Graph Valid Tree": {
    description: "Determine whether an undirected graph is connected and has no cycle.",
    examples: ["Input: n=5, edges=[[0,1],[0,2],[0,3],[1,4]] -> Output: true"]
  },
  "Min Cost to Connect All Points": {
    description: "Connect all points with minimum total Manhattan distance cost.",
    examples: ["Input: [[0,0],[2,2],[3,10],[5,2],[7,0]] -> Output: 20"]
  },
  "Network Delay Time": {
    description: "Find how long it takes a signal to reach all nodes in a weighted directed graph.",
    examples: ["Input: times=[[2,1,1],[2,3,1],[3,4,1]], n=4, k=2 -> Output: 2"]
  },
  "Cheapest Flights Within K Stops": {
    description: "Find the cheapest price from source to destination using at most k stops.",
    examples: ["Input: n=3, flights=[[0,1,100],[1,2,100],[0,2,500]], k=1 -> Output: 200"]
  },
  "House Robber": {
    description: "Find the maximum money that can be robbed without robbing adjacent houses.",
    examples: ["Input: [1,2,3,1] -> Output: 4"]
  },
  "House Robber II": {
    description: "Solve house robber when houses are arranged in a circle.",
    examples: ["Input: [2,3,2] -> Output: 3"]
  },
  "Longest Palindromic Substring": {
    description: "Return the longest contiguous substring that is a palindrome.",
    examples: ["Input: 'babad' -> Output: 'bab' or 'aba'"]
  },
  "Palindromic Substrings": {
    description: "Count how many substrings of a string are palindromes.",
    examples: ["Input: 'aaa' -> Output: 6"]
  },
  "Decode Ways": {
    description: "Count how many ways a digit string can be decoded into letters.",
    examples: ["Input: '226' -> Output: 3"]
  },
  "Coin Change": {
    description: "Find the fewest coins needed to make an amount, or -1 if impossible.",
    examples: ["Input: coins=[1,2,5], amount=11 -> Output: 3"]
  },
  "Maximum Product Subarray": {
    description: "Find the largest product of a contiguous subarray.",
    examples: ["Input: [2,3,-2,4] -> Output: 6"]
  },
  "Word Break": {
    description: "Determine whether a string can be segmented into dictionary words.",
    examples: ["Input: s='leetcode', wordDict=['leet','code'] -> Output: true"]
  },
  "Longest Increasing Subsequence": {
    description: "Find the length of the longest strictly increasing subsequence.",
    examples: ["Input: [10,9,2,5,3,7,101,18] -> Output: 4"]
  },
  "Partition Equal Subset Sum": {
    description: "Determine whether an array can be split into two subsets with equal sum.",
    examples: ["Input: [1,5,11,5] -> Output: true"]
  },
  "Unique Paths": {
    description: "Count paths from the top-left to bottom-right of an m by n grid moving only right or down.",
    examples: ["Input: m=3, n=7 -> Output: 28"]
  },
  "Longest Common Subsequence": {
    description: "Find the length of the longest subsequence common to two strings.",
    examples: ["Input: text1='abcde', text2='ace' -> Output: 3"]
  },
  "Best Time to Buy and Sell Stock with Cooldown": {
    description: "Maximize stock trading profit when selling triggers a one-day cooldown.",
    examples: ["Input: prices=[1,2,3,0,2] -> Output: 3"]
  },
  "Coin Change II": {
    description: "Count combinations of coins that sum to an amount.",
    examples: ["Input: amount=5, coins=[1,2,5] -> Output: 4"]
  },
  "Target Sum": {
    description: "Count ways to assign plus or minus signs to reach a target sum.",
    examples: ["Input: nums=[1,1,1,1,1], target=3 -> Output: 5"]
  },
  "Interleaving String": {
    description: "Determine whether a string is formed by interleaving two other strings in order.",
    examples: ["Input: s1='aab', s2='axy', s3='aaxaby' -> Output: true"]
  },
  "Edit Distance": {
    description: "Find the minimum insertions, deletions, or replacements needed to convert one word into another.",
    examples: ["Input: word1='horse', word2='ros' -> Output: 3"]
  },
  "Maximum Subarray": {
    description: "Find the largest sum of a contiguous subarray.",
    examples: ["Input: [-2,1,-3,4,-1,2,1,-5,4] -> Output: 6"]
  },
  "Jump Game": {
    description: "Determine whether the last index can be reached using max jump lengths at each position.",
    examples: ["Input: [2,3,1,1,4] -> Output: true"]
  },
  "Jump Game II": {
    description: "Find the minimum number of jumps needed to reach the last index.",
    examples: ["Input: [2,3,1,1,4] -> Output: 2"]
  },
  "Gas Station": {
    description: "Find the starting gas station index that allows a full circuit, or -1 if impossible.",
    examples: ["Input: gas=[1,2,3,4,5], cost=[3,4,5,1,2] -> Output: 3"]
  },
  "Hand of Straights": {
    description: "Determine whether cards can be rearranged into groups of consecutive values.",
    examples: ["Input: hand=[1,2,3,6,2,3,4,7,8], groupSize=3 -> Output: true"]
  },
  "Merge Triplets to Form Target Triplet": {
    description: "Determine whether triplets can be merged by coordinate-wise maximums to form a target.",
    examples: ["Input: triplets=[[2,5,3],[1,8,4],[1,7,5]], target=[2,7,5] -> Output: true"]
  },
  "Partition Labels": {
    description: "Split a string into as many parts as possible so each letter appears in at most one part.",
    examples: ["Input: 'ababcbacadefegdehijhklij' -> Output: [9,7,8]"]
  },
  "Valid Parenthesis String": {
    description: "Determine whether a parenthesis string is valid when '*' can act as '(', ')', or empty.",
    examples: ["Input: '(*))' -> Output: true"]
  },
  "Insert Interval": {
    description: "Insert a new interval into a sorted non-overlapping interval list and merge if needed.",
    examples: ["Input: intervals=[[1,3],[6,9]], new=[2,5] -> Output: [[1,5],[6,9]]"]
  },
  "Merge Intervals": {
    description: "Merge all overlapping intervals.",
    examples: ["Input: [[1,3],[2,6],[8,10]] -> Output: [[1,6],[8,10]]"]
  },
  "Non-overlapping Intervals": {
    description: "Find the minimum intervals to remove so the rest do not overlap.",
    examples: ["Input: [[1,2],[2,3],[3,4],[1,3]] -> Output: 1"]
  },
  "Meeting Rooms II": {
    description: "Find the minimum number of rooms required for all meetings.",
    examples: ["Input: [[0,30],[5,10],[15,20]] -> Output: 2"]
  },
  "Rotate Image": {
    description: "Rotate an n by n matrix 90 degrees clockwise in place.",
    examples: ["Input: [[1,2],[3,4]] -> Output: [[3,1],[4,2]]"]
  },
  "Spiral Matrix": {
    description: "Return all values of a matrix in spiral order.",
    examples: ["Input: [[1,2,3],[4,5,6],[7,8,9]] -> Output: [1,2,3,6,9,8,7,4,5]"]
  },
  "Set Matrix Zeroes": {
    description: "If a cell is zero, set its entire row and column to zero in place.",
    examples: ["Input: [[1,1,1],[1,0,1],[1,1,1]] -> Output: [[1,0,1],[0,0,0],[1,0,1]]"]
  },
  "Pow(x, n)": {
    description: "Compute x raised to integer power n efficiently.",
    examples: ["Input: x=2, n=10 -> Output: 1024"]
  },
  "Multiply Strings": {
    description: "Multiply two non-negative integers represented as strings without converting the whole input to an integer.",
    examples: ["Input: num1='123', num2='456' -> Output: '56088'"]
  },
  "Detect Squares": {
    description: "Design a structure that adds points and counts axis-aligned squares for a query point.",
    examples: ["Input: add([3,10]), add([11,2]), add([3,2]), count([11,10]) -> Output: 1"]
  },
  "Sum of Two Integers": {
    description: "Compute the sum of two integers without using the plus or minus operators.",
    examples: ["Input: a=1, b=2 -> Output: 3"]
  },
  "Reverse Integer": {
    description: "Reverse the digits of a signed 32-bit integer and return 0 on overflow.",
    examples: ["Input: x=-123 -> Output: -321"]
  },
  "Trapping Rain Water": {
    description: "Given bar heights, compute how much water can be trapped after raining.",
    examples: ["Input: [0,1,0,2,1,0,1,3,2,1,2,1] -> Output: 6"]
  },
  "Minimum Window Substring": {
    description: "Find the smallest substring of s containing every character of t with required counts.",
    examples: ["Input: s='ADOBECODEBANC', t='ABC' -> Output: 'BANC'"]
  },
  "Sliding Window Maximum": {
    description: "Return the maximum value in every contiguous window of size k.",
    examples: ["Input: nums=[1,3,-1,-3,5,3,6,7], k=3 -> Output: [3,3,5,5,6,7]"]
  },
  "Largest Rectangle in Histogram": {
    description: "Find the largest rectangle area that can be formed in a histogram.",
    examples: ["Input: heights=[2,1,5,6,2,3] -> Output: 10"]
  },
  "Median of Two Sorted Arrays": {
    description: "Find the median value of two sorted arrays in logarithmic time.",
    examples: ["Input: nums1=[1,3], nums2=[2] -> Output: 2"]
  },
  "Merge K Sorted Lists": {
    description: "Merge k sorted linked lists into one sorted linked list.",
    examples: ["Input: [1->4->5, 1->3->4, 2->6] -> Output: 1->1->2->3->4->4->5->6"]
  },
  "Reverse Nodes in K-Group": {
    description: "Reverse nodes of a linked list in groups of k, leaving incomplete trailing groups unchanged.",
    examples: ["Input: 1->2->3->4->5, k=2 -> Output: 2->1->4->3->5"]
  },
  "Binary Tree Maximum Path Sum": {
    description: "Find the maximum sum of any non-empty path in a binary tree.",
    examples: ["Input: root=[-10,9,20,null,null,15,7] -> Output: 42"]
  },
  "Serialize and Deserialize Binary Tree": {
    description: "Design methods to convert a binary tree to a string and rebuild the same tree from it.",
    examples: ["Input: root=[1,2,3,null,null,4,5] -> serialize -> deserialize -> same tree"]
  },
  "Word Search II": {
    description: "Find all dictionary words that can be formed by adjacent cells in a board.",
    examples: ["Input: board with letters, words=['oath','pea','eat','rain'] -> Output: ['oath','eat']"]
  },
  "Find Median from Data Stream": {
    description: "Design a structure that supports adding numbers and returning the current median.",
    examples: ["Input: addNum(1), addNum(2), findMedian() -> Output: 1.5"]
  },
  "N-Queens": {
    description: "Place n queens on an n by n board so none attack each other.",
    examples: ["Input: n=4 -> Output: 2 valid board layouts"]
  },
  "Word Ladder": {
    description: "Find the shortest transformation length from begin word to end word by changing one letter at a time.",
    examples: ["Input: begin='hit', end='cog', words include hot,dot,dog,lot,log,cog -> Output: 5"]
  },
  "Reconstruct Itinerary": {
    description: "Use all flight tickets exactly once to build the lexicographically smallest itinerary from JFK.",
    examples: ["Input: tickets=[['JFK','SFO'],['JFK','ATL'],['ATL','JFK']] -> Output starts JFK, ATL, JFK"]
  },
  "Swim in Rising Water": {
    description: "Find the earliest time you can travel from top-left to bottom-right as water level rises.",
    examples: ["Input: grid=[[0,2],[1,3]] -> Output: 3"]
  },
  "Alien Dictionary": {
    description: "Derive a valid character ordering from words sorted according to an unknown alphabet.",
    examples: ["Input: ['wrt','wrf','er','ett','rftt'] -> Output: 'wertf'"]
  },
  "Longest Increasing Path in a Matrix": {
    description: "Find the longest path in a matrix where each move goes to a strictly larger adjacent value.",
    examples: ["Input: [[9,9,4],[6,6,8],[2,1,1]] -> Output: 4"]
  },
  "Distinct Subsequences": {
    description: "Count how many distinct subsequences of one string equal another string.",
    examples: ["Input: s='rabbbit', t='rabbit' -> Output: 3"]
  },
  "Burst Balloons": {
    description: "Choose an order to burst balloons to maximize coins gained from neighboring values.",
    examples: ["Input: [3,1,5,8] -> Output: 167"]
  },
  "Regular Expression Matching": {
    description: "Implement pattern matching where '.' matches any single character and '*' repeats the previous token.",
    examples: ["Input: s='aab', p='c*a*b' -> Output: true"]
  },
  "Minimum Interval to Include Each Query": {
    description: "For each query, return the size of the smallest interval that contains it, or -1.",
    examples: ["Input: intervals=[[1,4],[2,4],[3,6]], queries=[2,3,7] -> Output: [3,3,-1]"]
  }
};

export function getProblemDetails(title: string): ProblemDetails {
  return problemDetails[title] ?? {
    description: `Solve the coding problem titled "${title}".`,
    examples: ["No local example is available for this problem yet."]
  };
}

export function formatProblemDetails(title: string): string {
  const details = getProblemDetails(title);
  const examples = details.examples.map((example) => `- ${example}`).join("\n");

  return `Description: ${details.description}\nExamples:\n${examples}`;
}
