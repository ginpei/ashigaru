import { createContext, useContext } from "react";
import { ShapeData } from "./ShapeData";

const ShapeDataContext = createContext<ShapeData[]>([]);

export const ShapeDataProvider = ShapeDataContext.Provider;

export function useShapeData(): ShapeData[] {
  return useContext(ShapeDataContext);
}
