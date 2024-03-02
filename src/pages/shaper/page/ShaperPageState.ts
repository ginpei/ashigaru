import { ShapeData } from "../shape/ShapeData";

export interface ShaperPageState {
  shapes: ShapeData[];
  selectedShapeIds: string[];
}
