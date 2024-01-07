import { CommandPaletteShowcase } from "../commandPalette/showcase";
import { MenuShowcase } from "../menu/showcase";

export const showcaseList = {
  [CommandPaletteShowcase.path]: CommandPaletteShowcase,
  [MenuShowcase.path]: MenuShowcase,
} as const;
