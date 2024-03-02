import { selectShape } from "../page/ShaperPageState";
import { useShaperPageStateContext } from "../page/shaperPageStateContext";
import { MarqueeProps } from "./Marquee";
import { ShaperCanvas } from "./ShaperCanvas";

export function CanvasPane(): JSX.Element {
  const [{ selectedShapeIds, shapes }, setState] = useShaperPageStateContext();

  const onShapeSelect: MarqueeProps["onSelect"] = (id, type) => {
    setState((state) => selectShape(state, [id], type));
  };

  return (
    <div className="CanvasPane">
      <ShaperCanvas
        onSelect={onShapeSelect}
        selectedIds={selectedShapeIds}
        data={shapes}
      />
    </div>
  );
}
