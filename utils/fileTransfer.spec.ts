/* SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev>

SPDX-License-Identifier: GPL-3.0-or-later */

import { describe, expect, it } from "vitest";
import { filesFromTransfer, lineIndexFromTextOffset } from "./fileTransfer";

const makeTransfer = (files: File[]) => ({
  files,
  items: files.map(file => ({
    getAsFile: () => file,
    kind: "file",
  })),
}) as unknown as DataTransfer;

const withPath = (file: File, path: string) => {
  Object.defineProperty(file, "path", {
    configurable: true,
    value: path,
  });
  return file;
};

describe("filesFromTransfer", () => {
  it("deduplicates files reported by items and files", () => {
    const file = new File(["hello"], "note.txt", {
      lastModified: 1,
      type: "text/plain",
    });

    const files = filesFromTransfer(makeTransfer([file]), "drop");

    expect(files).toHaveLength(1);
    expect(files[0]).toMatchObject({
      file,
      name: "note.txt",
      path: "",
    });
  });

  it("preserves tauri file paths", () => {
    const file = withPath(new File(["hello"], "note.txt", {
      lastModified: 1,
      type: "text/plain",
    }), "C:\\tmp\\note.txt");

    const files = filesFromTransfer(makeTransfer([file]), "drop");

    expect(files[0].path).toBe("C:\\tmp\\note.txt");
  });

  it("names pathless pasted images", () => {
    const image = new File(["image"], "image.png", {
      lastModified: 1,
      type: "image/png",
    });

    const files = filesFromTransfer(
      makeTransfer([image]),
      "paste",
      () => new Date("2026-06-30T01:02:03.000Z")
    );

    expect(files[0].name).toBe("pasted-image-20260630-010203.png");
  });

  it("keeps normal pathless file names", () => {
    const file = new File(["hello"], "note.txt", {
      lastModified: 1,
      type: "text/plain",
    });

    const files = filesFromTransfer(makeTransfer([file]), "paste");

    expect(files[0].name).toBe("note.txt");
  });
});

describe("lineIndexFromTextOffset", () => {
  it("maps text offsets to zero-based line indexes", () => {
    const value = "first\nsecond\nthird";

    expect(lineIndexFromTextOffset(value, 0)).toBe(0);
    expect(lineIndexFromTextOffset(value, 6)).toBe(1);
    expect(lineIndexFromTextOffset(value, value.length)).toBe(2);
  });

  it("clamps empty and out-of-range offsets", () => {
    expect(lineIndexFromTextOffset("", 20)).toBe(0);
    expect(lineIndexFromTextOffset("one\ntwo", -10)).toBe(0);
    expect(lineIndexFromTextOffset("one\ntwo", 100)).toBe(1);
  });
});
