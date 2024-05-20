import { ActionAboutActionDemoPage } from "../action/_showcase/aboutAction";
import { ActionPageCommandSystemDemoPage } from "../action/_showcase/pageCommandSystem";
import { SimpleActionDemoPage } from "../action/_showcase/simple";
import { CommandPaletteShowcase } from "../commandPalette/_showcase";
import { DialogDemoPage } from "../dialog/_showcase/Dialog";
import { MenuShowcase } from "../menu/_showcase/NiceMenu";
import { StylesPage } from "../styles/_showcase";

export const showcaseList = {
  [ActionAboutActionDemoPage.path]: ActionAboutActionDemoPage,
  [ActionPageCommandSystemDemoPage.path]: ActionPageCommandSystemDemoPage,
  [CommandPaletteShowcase.path]: CommandPaletteShowcase,
  [DialogDemoPage.path]: DialogDemoPage,
  [MenuShowcase.path]: MenuShowcase,
  [SimpleActionDemoPage.path]: SimpleActionDemoPage,
  [StylesPage.path]: StylesPage,
} as const;
