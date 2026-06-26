const codeFence = /^```(?<language>js|javascript|ts|typescript)\s*\r?\n(?<source>[\s\S]*?)\r?\n?```\s*$/i;
const maximumSourceCharacters = 20_000;
export function parseCodeSubmission(content) {
    const match = content.trim().match(codeFence);
    const source = match?.groups?.source?.trim();
    if (!match || !source || source.length > maximumSourceCharacters) {
        return undefined;
    }
    const language = normalizeLanguage(match.groups?.language);
    return language ? { language, source } : undefined;
}
export function codeSubmissionInstruction(functionName) {
    return "Submit one fenced `js` or `ts` code block that exports or declares " +
        `\`${functionName}\`. Example:\n\`\`\`ts\nexport function ${functionName}(/* arguments */) {\n  // solution\n}\n\`\`\``;
}
function normalizeLanguage(value) {
    if (value === "js" || value === "javascript") {
        return "javascript";
    }
    if (value === "ts" || value === "typescript") {
        return "typescript";
    }
    return undefined;
}
//# sourceMappingURL=codeFence.js.map