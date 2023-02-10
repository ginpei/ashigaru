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
    const openNoteIds: string[] = [];
    const input = "";
    const result = getNoteOptions(notes, openNoteIds, input);
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
    const openNoteIds: string[] = [];
    const result = getNoteOptions(notes, openNoteIds, input);
    expect(result.map((v) => v.id)).toEqual(["note2"]);
  });

  it("returns filtered ones by keyword", () => {
    const notes: Note[] = [
      createNote({
        id: "note1",
        title: "Note 1",
      }),
      createNote({
        id: "note2",
        title: "Note 2",
      }),
      createNote({
        id: "note3",
        title: "Note 3",
      }),
    ];
    const input = "";
    const openNoteIds = ["note3", "note1"];
    const result = getNoteOptions(notes, openNoteIds, input);
    expect(result.map((v) => v.id)).toEqual(["note3", "note1", "note2"]);
  });

  it("returns empty by empty", () => {
    const notes: Note[] = [];
    const input = "";
    const openNoteIds: string[] = [];
    const result = getNoteOptions(notes, openNoteIds, input);
    expect(result).toEqual([]);
  });
});
