import { describe, expect, it } from "vitest";
import { createNote } from "./Note";

describe("createNote()", () => {
  it("creates an object without initial values", () => {
    const result = createNote();
    expect(result).toEqual({
      body: "",
      id: "",
      title: "",
    });
  });

  it("creates an object with specified values", () => {
    const result = createNote({
      body: "body",
      id: "id",
      title: "title",
    });
    expect(result).toEqual({
      body: "body",
      id: "id",
      title: "title",
    });
  });

  it("creates an object with partial initial values", () => {
    const result = createNote({ body: "body" });
    expect(result).toEqual({
      body: "body",
      id: "",
      title: "",
    });
  });
});
