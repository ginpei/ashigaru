import { DragHandlers, useDrag } from "../../../domains/pointer/dragHooks";
import { ShapeData } from "../shape/ShapeData";
import { getShapeLayoutStyle } from "../shape/shapeStyleFunctions";

export interface MarqueeProps {
  dx: number;
  dy: number;
  onDragEnd: DragHandlers["onEnd"];
  onDragMove: DragHandlers["onMove"];
  onSelect: (id: string, type: "single" | "append") => void;
  shape: ShapeData;
}

export function Marquee({
  dx,
  dy,
  onDragEnd,
  onDragMove,
  onSelect,
  shape,
}: MarqueeProps): JSX.Element {
  const [refDragButton] = useDrag<HTMLButtonElement>({
    onClick(event) {
      const type = event.ctrlKey ? "append" : "single";
      onSelect(shape.id, type);
    },
    onEnd: onDragEnd,
    onMove: onDragMove,
  });

  const layoutStyle = getShapeLayoutStyle(shape);
  const style: typeof layoutStyle = {
    height: layoutStyle.height,
    left: layoutStyle.left + dx,
    top: layoutStyle.top + dy,
    width: layoutStyle.width,
  };

  return (
    <button
      className="
        Marquee
        absolute touch-none select-none overflow-hidden break-words border-2 border-blue-900 bg-blue-900/50
        p-1 text-xs text-white outline-dashed -outline-offset-2 outline-white/75
        hover:bg-blue-500/50
      "
      ref={refDragButton}
      style={style}
    >
      <span className="relative z-10">{shape.name}</span>
    </button>
  );
}
