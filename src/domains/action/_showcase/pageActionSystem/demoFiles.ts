import { CommandPaletteOption } from "../../../commandPalette/CommandPaletteFrame";

export interface DemoFile extends CommandPaletteOption {}

export function getDemoFiles(): DemoFile[] {
  return [
    {
      id: "file1",
      title: "hello.txt",
    },
    {
      id: "file2",
      title: "world.js",
    },
    {
      id: "file3",
      title: "index.html",
    },
  ];
}
