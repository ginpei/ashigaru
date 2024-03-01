import { useShapeData } from "../shape/shapeDataContext";
import { ShaperCanvas } from "./ShaperCanvas";

export function CanvasPane(): JSX.Element {
  const data = useShapeData();

  return (
    <div className="CanvasPane">
      <ShaperCanvas data={data} />
    </div>
  );
}
