import { useDrag } from "../../../domains/pointer/dragHooks";
import { ShapeData } from "../shape/ShapeData";
import { getShapeLayoutStyle } from "../shape/shapeStyleFunctions";

export interface MarqueeProps {
  onSelect: (id: string, type: "single" | "append") => void;
  shape: ShapeData;
}

export function Marquee({ onSelect, shape }: MarqueeProps): JSX.Element {
  const [refDragButton, dx, dy] = useDrag<HTMLButtonElement>({
    onClick(event) {
      const type = event.ctrlKey ? "append" : "single";
      onSelect(shape.id, type);
    },
    onEnd(x, y, ok) {
      console.log("# complete", x, y, ok);
    },
    onStart(event) {
      console.log("# start", event);
    },
  });

  const layoutStyle = getShapeLayoutStyle(shape);
  const style: typeof layoutStyle = {
    height: layoutStyle.height,
    left: layoutStyle.left + dx, // TODO receive dx, dy as props
    top: layoutStyle.top + dy,
    width: layoutStyle.width,
  };

  return (
    <button
      className="
        Marquee
        absolute overflow-hidden break-words border-2 border-blue-900 bg-blue-900/50
        p-1 text-xs text-white outline-dashed -outline-offset-2 outline-white/75
        hover:bg-blue-500/50
      "
      ref={refDragButton}
      style={style}
    >
      {shape.name}
    </button>
  );
}
