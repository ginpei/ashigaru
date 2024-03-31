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

export function removeShape(
  state: ShaperPageState,
  shapeIds: string[],
): ShaperPageState {
  const selectedShapeIds = state.selectedShapeIds.filter(
    (id) => !shapeIds.includes(id),
  );
  const shapes = state.shapes.filter((shape) => !shapeIds.includes(shape.id));
  return {
    ...state,
    selectedShapeIds,
    shapes,
  };
}
