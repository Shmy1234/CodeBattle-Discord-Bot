const snowflake = "\\d{17,20}";
const messageIdPattern = new RegExp(`^${snowflake}$`);
const messageLinkPattern = new RegExp(`^https://(?:(?:canary|ptb)\\.)?discord(?:app)?\\.com/channels/` +
    `(?<guildId>${snowflake})/(?<channelId>${snowflake})/(?<messageId>${snowflake})/?(?:\\?.*)?$`, "i");
export function parseDiscordMessageReference(value) {
    const input = value.trim();
    if (messageIdPattern.test(input)) {
        return { guildId: null, channelId: null, messageId: input };
    }
    const match = input.match(messageLinkPattern);
    const guildId = match?.groups?.guildId;
    const channelId = match?.groups?.channelId;
    const messageId = match?.groups?.messageId;
    if (!guildId || !channelId || !messageId) {
        return undefined;
    }
    return { guildId, channelId, messageId };
}
//# sourceMappingURL=messageReference.js.map