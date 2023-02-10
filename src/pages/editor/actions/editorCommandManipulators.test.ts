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
    const editingNoteId = "";
    const input = "";

    const result = getNoteOptions(notes, openNoteIds, editingNoteId, input);
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
    const openNoteIds: string[] = [];
    const editingNoteId = "";
    const input = "he";

    const result = getNoteOptions(notes, openNoteIds, editingNoteId, input);
    expect(result.map((v) => v.id)).toEqual(["note2"]);
  });

  it("returns ordered by open note IDs", () => {
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
    const openNoteIds = ["note3", "note1"];
    const editingNoteId = "";
    const input = "";

    const result = getNoteOptions(notes, openNoteIds, editingNoteId, input);
    expect(result.map((v) => v.id)).toEqual(["note3", "note1", "note2"]);
  });

  it("prioritize editing note", () => {
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
    const openNoteIds = ["note3", "note1"];
    const editingNoteId = "note2";
    const input = "";

    const result = getNoteOptions(notes, openNoteIds, editingNoteId, input);
    expect(result.map((v) => v.id)).toEqual(["note2", "note3", "note1"]);
  });

  it("returns empty by empty", () => {
    const notes: Note[] = [];
    const openNoteIds: string[] = [];
    const editingNoteId = "";
    const input = "";

    const result = getNoteOptions(notes, openNoteIds, editingNoteId, input);
    expect(result).toEqual([]);
  });
});
