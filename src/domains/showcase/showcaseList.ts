import { ActionAboutActionDemoPage } from "../action/_showcase/aboutAction";
import { ActionAboutConditionDemoPage } from "../action/_showcase/aboutCondition";
import { ActionPageCommandSystemDemoPage } from "../action/_showcase/pageCommandSystem";
import { SimpleActionDemoPage } from "../action/_showcase/simple";
import { CommandPaletteShowcase } from "../commandPalette/_showcase";
import { DialogDemoPage } from "../dialog/_showcase/Dialog";
import { MenuShowcase } from "../menu/_showcase/NiceMenu";
import { NiceUisShowcase } from "../nice/_showcase/niceUis";
import { StylesPage } from "../styles/_showcase";

export const showcaseList = {
  [ActionAboutActionDemoPage.path]: ActionAboutActionDemoPage,
  [ActionAboutConditionDemoPage.path]: ActionAboutConditionDemoPage,
  [ActionPageCommandSystemDemoPage.path]: ActionPageCommandSystemDemoPage,
  [CommandPaletteShowcase.path]: CommandPaletteShowcase,
  [DialogDemoPage.path]: DialogDemoPage,
  [MenuShowcase.path]: MenuShowcase,
  [NiceUisShowcase.path]: NiceUisShowcase,
  [SimpleActionDemoPage.path]: SimpleActionDemoPage,
  [StylesPage.path]: StylesPage,
} as const;
