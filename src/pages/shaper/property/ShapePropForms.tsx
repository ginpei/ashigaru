import { useCallback } from "react";
import { useShaperPageStateContext } from "../page/shaperPageStateContext";
import { ShapeData } from "../shape/ShapeData";
import { mergeMultipleShapes } from "../shape/shapeStyleFunctions";
import { GeneralForm } from "./GeneralForm";
import { LayoutForm } from "./LayoutForm";
import { ThemeForm } from "./ThemeForm";

export function ShapePropForms() {
  const [{ selectedShapeIds, shapes: allShapes }, setState] =
    useShaperPageStateContext();
  const shapes = allShapes.filter((shape) =>
    selectedShapeIds.includes(shape.id),
  );
  const editingShape = mergeMultipleShapes(shapes);

  const onFormChange = useCallback(
    (updates: Partial<ShapeData>) => {
      setState((state) => {
        const newShapes = state.shapes.map((shape) =>
          state.selectedShapeIds.includes(shape.id)
            ? { ...shape, ...updates }
            : shape,
        );
        return { ...state, shapes: newShapes };
      });
    },
    [setState],
  );

  return (
    <div className="flex flex-col gap-4">
      <h2 className="px-4 pt-4 text-sm font-bold">Properties</h2>
      <GeneralForm shapes={shapes} onChange={onFormChange} />
      <LayoutForm shape={editingShape} onChange={onFormChange} />
      <ThemeForm shape={editingShape} onChange={onFormChange} />
    </div>
  );
}
