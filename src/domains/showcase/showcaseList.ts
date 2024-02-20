import { ActionAboutActionDemoPage } from "../action/showcase/aboutAction";
import { ActionCommandDemoPage } from "../action/showcase/command";
import { ActionPageCommandSystemDemoPage } from "../action/showcase/pageCommandSystem";
import { ActionShortcutDemoPage } from "../action/showcase/shortcut";
import { CommandPaletteShowcase } from "../commandPalette/showcase";
import { MenuShowcase } from "../menu/showcase/NiceMenu";
import { StylesPage } from "../styles/showcase";

export const showcaseList = {
  [ActionAboutActionDemoPage.path]: ActionAboutActionDemoPage,
  [ActionCommandDemoPage.path]: ActionCommandDemoPage,
  [ActionPageCommandSystemDemoPage.path]: ActionPageCommandSystemDemoPage,
  [ActionShortcutDemoPage.path]: ActionShortcutDemoPage,
  [CommandPaletteShowcase.path]: CommandPaletteShowcase,
  [MenuShowcase.path]: MenuShowcase,
  [StylesPage.path]: StylesPage,
} as const;
