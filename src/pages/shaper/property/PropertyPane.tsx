import { useCallback } from "react";
import { ShaperPageState } from "../page/ShaperPageState";
import { useShaperPageStateContext } from "../page/shaperPageStateContext";
import { ShapeData } from "../shape/ShapeData";
import { mergeMultipleShapes } from "../shape/shapeStyleFunctions";
import { GeneralForm } from "./GeneralForm";
import { LayoutForm } from "./LayoutForm";
import { ShapePropForms } from "./ShapePropForms";
import { ThemeForm } from "./ThemeForm";

export function PropertyPane(): React.JSX.Element {
  const [{ selectedShapeIds }] = useShaperPageStateContext();

  return (
    <div className="PropertyPane bg-gray-100">
      {selectedShapeIds.length > 0 ? (
        <ShapePropForms />
      ) : (
        <p className="p-4">
          <small className="text-gray-400">Select one shape to edit</small>
        </p>
      )}
    </div>
  );
}
