import { describe, expect, it } from "vitest";
import { createCommandDefinition } from "../command/CommandDefinition";
import {
  highlightFilteredCommandTitle,
  isCommandMatched,
} from "./commandFilter";

describe("isCommandMatched()", () => {
  it("matches if no filters", () => {
    const command = createCommandDefinition({ title: "Command 1" });
    const result = isCommandMatched(command, { keyword: "" });
    expect(result).toBe(true);
  });

  describe("keyword", () => {
    it("matches title in case insensitive", () => {
      const command = createCommandDefinition({ title: "---CoMMand 11---" });
      const result = isCommandMatched(command, { keyword: "command 1" });
      expect(result).toBe(true);
    });

    it("skips unmatched letters", () => {
      const command = createCommandDefinition({ title: "a.b..c" });
      const result = isCommandMatched(command, { keyword: "abc" });
      expect(result).toBe(true);
    });

    it("doesn't matches with duplicated characters", () => {
      const command = createCommandDefinition({ title: "a.b..c" });
      const result = isCommandMatched(command, { keyword: "abbc" });
      expect(result).toBe(false);
    });

    it("doesn't matches in wrong order", () => {
      const command = createCommandDefinition({ title: "a.b..c" });
      const result = isCommandMatched(command, { keyword: "acb" });
      expect(result).toBe(false);
    });
  });
});

describe("highlightFilteredCommandTitle()", () => {
  it("highlights matched characters", () => {
    const title = "Hello";
    const keyword = "Heo";
    const result = highlightFilteredCommandTitle(title, keyword);
    expect(result).toEqual([
      { character: "H", highlight: true },
      { character: "e", highlight: true },
      { character: "l", highlight: false },
      { character: "l", highlight: false },
      { character: "o", highlight: true },
    ]);
  });

  it("returns null if not match", () => {
    const title = "Hello";
    const keyword = "hol";
    const result = highlightFilteredCommandTitle(title, keyword);
    expect(result).toEqual(null);
  });

  it("matches as case insensitive", () => {
    const title = "Hello";
    const keyword = "hE";
    const result = highlightFilteredCommandTitle(title, keyword);
    expect(result).toEqual([
      { character: "H", highlight: true },
      { character: "e", highlight: true },
      { character: "l", highlight: false },
      { character: "l", highlight: false },
      { character: "o", highlight: false },
    ]);
  });

  it("matches only characters from the head", () => {
    const title = "lll";
    const keyword = "ll";
    const result = highlightFilteredCommandTitle(title, keyword);
    expect(result).toEqual([
      { character: "l", highlight: true },
      { character: "l", highlight: true },
      { character: "l", highlight: false },
    ]);
  });

  it("matches only forward", () => {
    const title = "holo";
    const keyword = "hlo";
    const result = highlightFilteredCommandTitle(title, keyword);
    expect(result).toEqual([
      { character: "h", highlight: true },
      { character: "o", highlight: false },
      { character: "l", highlight: true },
      { character: "o", highlight: true },
    ]);
  });
});
