import { describe, expect, it } from "vitest";
import { createNote, Note } from "../../../domains/note/Note";
import { getNoteOptions } from "./editorCommandManipulators";

describe("getNoteOptions()", () => {
  it("returns all without keyword", () => {
    const notes: Note[] = [
      createNote({
        id: "note1",
        title: "Note 1",
      }),
      createNote({
        id: "note2",
        title: "Note 2",
      }),
    ];
    const input = "";
    const result = getNoteOptions(notes, input);
    expect(result.map((v) => v.id)).toEqual(["note1", "note2"]);
  });

  it("returns filtered ones by keyword", () => {
    const notes: Note[] = [
      createNote({
        id: "note1",
        title: "Note 1",
      }),
      createNote({
        id: "note2",
        title: "Note 2 hehe",
      }),
    ];
    const input = "he";
    const result = getNoteOptions(notes, input);
    expect(result.map((v) => v.id)).toEqual(["note2"]);
  });

  it("returns empty by empty", () => {
    const notes: Note[] = [];
    const input = "";
    const result = getNoteOptions(notes, input);
    expect(result).toEqual([]);
  });
});
