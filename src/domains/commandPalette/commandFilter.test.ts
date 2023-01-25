import { describe, expect, it } from "vitest";
import { highlightFilteredCommandTitle } from "./commandFilter";

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
