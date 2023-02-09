import { describe, expect, it } from "vitest";
import { createNote } from "./Note";
import { findFocusAfterDeletion, pickNotesByIds } from "./noteListHandlers";
import { NoteListState } from "./NoteListState";

describe("findFocusAfterDeletion", () => {
  it("returns the first remaining item above", () => {
    const state: NoteListState = {
      editingNoteId: "4-current",
      focusedNoteId: "4-current",
      selectedNoteIds: ["2-deleted", "3-deleted", "4-current"],
      notes: [
        createNote({ id: "1-next" }),
        createNote({ id: "2-deleted" }),
        createNote({ id: "3-deleted" }),
        createNote({ id: "4-current" }),
        createNote({ id: "5" }),
      ],
    };

    const result = findFocusAfterDeletion(state);
    expect(result).toBe("1-next");
  });

  it("returns the first remaining item below if nothing remains above", () => {
    const state: NoteListState = {
      editingNoteId: "3-current",
      focusedNoteId: "3-current",
      selectedNoteIds: ["1-deleted", "2-deleted", "3-current", "4-deleted"],
      notes: [
        createNote({ id: "1-deleted" }),
        createNote({ id: "2-deleted" }),
        createNote({ id: "3-current" }),
        createNote({ id: "4-deleted" }),
        createNote({ id: "5-next" }),
      ],
    };

    const result = findFocusAfterDeletion(state);
    expect(result).toBe("5-next");
  });

  it("returns the current focus ID if target does not include it", () => {
    const state: NoteListState = {
      editingNoteId: "3-current",
      focusedNoteId: "3-current",
      selectedNoteIds: ["2-deleted"],
      notes: [
        createNote({ id: "1" }),
        createNote({ id: "2-deleted" }),
        createNote({ id: "3-current" }),
        createNote({ id: "4" }),
      ],
    };

    const result = findFocusAfterDeletion(state);
    expect(result).toBe("3-current");
  });

  it("returns empty if nothing remains", () => {
    const state: NoteListState = {
      editingNoteId: "3-current",
      focusedNoteId: "3-current",
      selectedNoteIds: ["1-deleted", "2-deleted", "3-current", "4-deleted"],
      notes: [
        createNote({ id: "1-deleted" }),
        createNote({ id: "2-deleted" }),
        createNote({ id: "3-current" }),
        createNote({ id: "4-deleted" }),
      ],
    };

    const result = findFocusAfterDeletion(state);
    expect(result).toBe("");
  });
});

describe("pickNotesByIds", () => {
  it("returns matched notes in the given order", () => {
    const notes = [
      createNote({ id: "0" }),
      createNote({ id: "1" }),
      createNote({ id: "2" }),
      createNote({ id: "3" }),
      createNote({ id: "4" }),
    ];
    const result = pickNotesByIds(notes, ["2", "4", "1"]);
    expect(result).toEqual([notes[2], notes[4], notes[1]]);
  });
});
