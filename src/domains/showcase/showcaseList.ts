import { CommandIndex } from "../command/showcase";
import { CommandPaletteShowcase } from "../commandPalette/showcase";
import { PageCommandSystemPage } from "../commandPalette/showcase/pageCommandSystem";
import { MenuShowcase } from "../menu/showcase";
import { ShortcutIndex } from "../shortcut/showcase";
import { StylesPage } from "../styles/showcase";

export const showcaseList = {
  [CommandIndex.path]: CommandIndex,
  [CommandPaletteShowcase.path]: CommandPaletteShowcase,
  [PageCommandSystemPage.path]: PageCommandSystemPage,
  [MenuShowcase.path]: MenuShowcase,
  [ShortcutIndex.path]: ShortcutIndex,
  [StylesPage.path]: StylesPage,
} as const;
