import { CommandIndex } from "../command/showcase";
import { CommandPaletteShowcase } from "../commandPalette/showcase";
import { MenuShowcase } from "../menu/showcase";
import { ShortcutIndex } from "../shortcut/showcase";

export const showcaseList = {
  [CommandIndex.path]: CommandIndex,
  [CommandPaletteShowcase.path]: CommandPaletteShowcase,
  [MenuShowcase.path]: MenuShowcase,
  [ShortcutIndex.path]: ShortcutIndex,
} as const;
