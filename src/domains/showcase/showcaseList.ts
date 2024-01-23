import { CommandAboutActionDemoPage } from "../action/showcase/aboutAction";
import { CommandIndex } from "../action/showcase/command";
import { ActionShortcutDemoPage } from "../action/showcase/shortcut";
import { CommandPaletteShowcase } from "../commandPalette/showcase";
import { PageCommandSystemDemoPage } from "../commandPalette/showcase/pageCommandSystem/PageCommandSystemDemoPage";
import { MenuShowcase } from "../menu/showcase";
import { StylesPage } from "../styles/showcase";

export const showcaseList = {
  [CommandAboutActionDemoPage.path]: CommandAboutActionDemoPage,
  [CommandIndex.path]: CommandIndex,
  [CommandPaletteShowcase.path]: CommandPaletteShowcase,
  [MenuShowcase.path]: MenuShowcase,
  [PageCommandSystemDemoPage.path]: PageCommandSystemDemoPage,
  [ActionShortcutDemoPage.path]: ActionShortcutDemoPage,
  [StylesPage.path]: StylesPage,
} as const;
