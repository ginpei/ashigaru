import { describe, expect, it } from "vitest";
import { createNote } from "./Note";
import { createNoteListState } from "./NoteListState";

describe("createNoteListState()", () => {
  it("creates an object without initial values", () => {
    const result = createNoteListState();
    expect(result).toEqual({
      editingNoteId: "",
      focusedNoteId: "",
      notes: [],
      selectedNoteIds: [],
    });
  });

  it("creates an object with specified values", () => {
    const result = createNoteListState({
      editingNoteId: "editingNoteId",
      focusedNoteId: "focusedNoteId",
      notes: [createNote({ title: "note" })],
      selectedNoteIds: ["selectedNoteIds"],
    });
    expect(result).toEqual({
      editingNoteId: "editingNoteId",
      focusedNoteId: "focusedNoteId",
      notes: [createNote({ title: "note" })],
      selectedNoteIds: ["selectedNoteIds"],
    });
  });

  it("creates an object with partial initial values", () => {
    const result = createNoteListState({
      notes: [createNote({ title: "note" })],
    });
    expect(result).toEqual({
      editingNoteId: "",
      focusedNoteId: "",
      notes: [createNote({ title: "note" })],
      selectedNoteIds: [],
    });
  });
});
