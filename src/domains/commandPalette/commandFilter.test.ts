import { describe, expect, it } from "vitest";
import { CommandDefinition } from "../command/CommandDefinition";
import {
  CommandFilter,
  highlightCommands,
  highlightFilteredCommandTitle,
} from "./commandFilter";

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

describe("highlightCommands", () => {
  it("filters and highlights commands", () => {
    const exec = () => {};
    const commands: CommandDefinition[] = [
      {
        exec,
        id: "command1",
        title: "Command 1",
      },
      {
        exec,
        id: "command2",
        title: "Command 2",
      },
      {
        exec,
        id: "command3",
        title: "dd11",
      },
    ];
    const filter: CommandFilter = {
      keyword: "d1",
    };

    const result = highlightCommands(commands, filter);
    expect(result.length).toBe(2);
    expect(result[0].id).toBe("command1");
    expect(result[1].id).toBe("command3");
    expect(result[1].highlightedCharacters).toEqual([
      {
        character: "d",
        highlight: true,
      },
      {
        character: "d",
        highlight: false,
      },
      {
        character: "1",
        highlight: true,
      },
      {
        character: "1",
        highlight: false,
      },
    ]);
  });
});
