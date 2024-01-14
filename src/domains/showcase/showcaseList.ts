import { CommandIndex } from "../command/showcase";
import { CommandPaletteShowcase } from "../commandPalette/showcase";
import { PageCommandSystemDemoPage } from "../commandPalette/showcase/pageCommandSystem/PageCommandSystemDemoPage";
import { MenuShowcase } from "../menu/showcase";
import { ShortcutIndex } from "../shortcut/showcase";
import { StylesPage } from "../styles/showcase";

export const showcaseList = {
  [CommandIndex.path]: CommandIndex,
  [CommandPaletteShowcase.path]: CommandPaletteShowcase,
  [MenuShowcase.path]: MenuShowcase,
  [PageCommandSystemDemoPage.path]: PageCommandSystemDemoPage,
  [ShortcutIndex.path]: ShortcutIndex,
  [StylesPage.path]: StylesPage,
} as const;
