import { ActionAboutActionDemoPage } from "../action/_showcase/aboutAction";
import { ActionCommandDemoPage } from "../action/_showcase/command";
import { ActionPageCommandSystemDemoPage } from "../action/_showcase/pageCommandSystem";
import { ActionShortcutDemoPage } from "../action/_showcase/shortcut";
import { CommandPaletteShowcase } from "../commandPalette/_showcase";
import { DialogDemoPage } from "../dialog/_showcase/Dialog";
import { MenuShowcase } from "../menu/_showcase/NiceMenu";
import { StylesPage } from "../styles/_showcase";

export const showcaseList = {
  [ActionAboutActionDemoPage.path]: ActionAboutActionDemoPage,
  [ActionCommandDemoPage.path]: ActionCommandDemoPage,
  [ActionPageCommandSystemDemoPage.path]: ActionPageCommandSystemDemoPage,
  [ActionShortcutDemoPage.path]: ActionShortcutDemoPage,
  [CommandPaletteShowcase.path]: CommandPaletteShowcase,
  [DialogDemoPage.path]: DialogDemoPage,
  [MenuShowcase.path]: MenuShowcase,
  [StylesPage.path]: StylesPage,
} as const;
