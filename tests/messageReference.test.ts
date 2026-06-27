import assert from "node:assert/strict";
import test from "node:test";
import { parseDiscordMessageReference } from "../src/discord/messageReference.js";

test("accepts a Discord message ID for the current channel", () => {
  assert.deepEqual(parseDiscordMessageReference("123456789012345678"), {
    messageId: "123456789012345678",
    channelId: null,
    guildId: null
  });
});

test("accepts a Discord message link", () => {
  assert.deepEqual(
    parseDiscordMessageReference("https://discord.com/channels/123456789012345678/234567890123456789/345678901234567890"),
    {
      guildId: "123456789012345678",
      channelId: "234567890123456789",
      messageId: "345678901234567890"
    }
  );
});

test("rejects text that is neither a message ID nor a Discord message link", () => {
  assert.equal(parseDiscordMessageReference("here is my code"), undefined);
});
