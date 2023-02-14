import CommandPaletteShowcase from "../commandPalette/showcase";
import { MenuShowcase } from "../menu/showcase/NiceMenu";

export const showcaseList = {
  "commandPalette/CommandPalette": CommandPaletteShowcase,
  [MenuShowcase.path]: MenuShowcase,
} as const;
