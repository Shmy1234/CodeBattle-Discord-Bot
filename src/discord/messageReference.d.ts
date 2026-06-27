export type DiscordMessageReference = {
    guildId: string | null;
    channelId: string | null;
    messageId: string;
};
export declare function parseDiscordMessageReference(value: string): DiscordMessageReference | undefined;
//# sourceMappingURL=messageReference.d.ts.map