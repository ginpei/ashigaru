import { ShaperPageState } from "../page/ShaperPageState";
import { ShapeData } from "./ShapeData";

export function addShape(
  state: ShaperPageState,
  shape: ShapeData,
): ShaperPageState {
  return {
    ...state,
    selectedShapeIds: [shape.id],
    shapes: [...state.shapes, shape],
  };
}
