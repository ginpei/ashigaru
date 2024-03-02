import { MouseEventHandler } from "react";
import { useCommand } from "../action/commandContext";
import { useShaperPageStateContext } from "../page/shaperPageStateContext";
import { ShapeData } from "../shape/ShapeData";

export interface ListPaneProps {}

export function ListPane(): JSX.Element {
  const [{ selectedShapeIds, shapes }, setState] = useShaperPageStateContext();
  const selectShape = useCommand("selectShape");

  const reverseShapes = [...shapes].reverse();

  const onItemSelect: ShapeListItemProps["onSelect"] = (id, type) => {
    selectShape?.exec([id], type);
  };

  return (
    <div className="ListPane bg-white">
      <h2 className="p-2 text-xs font-bold">Shapes</h2>
      <div className="h-full border-t bg-gray-100">
        {reverseShapes.map((shape) => (
          <ShapeListItem
            key={shape.id}
            data={shape}
            onSelect={onItemSelect}
            selected={selectedShapeIds.includes(shape.id)}
          />
        ))}
      </div>
    </div>
  );
}

interface ShapeListItemProps {
  data: ShapeData;
  onSelect: (id: string, type: "single" | "append") => void;
  selected: boolean;
}

function ShapeListItem({
  data,
  onSelect,
  selected,
}: ShapeListItemProps): JSX.Element {
  const onItemClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    const type = event.ctrlKey ? "append" : "single";
    onSelect(data.id, type);
  };

  return (
    <button
      className={`
        ShapeListItem
        block w-full border-b bg-white p-2 text-start
        ${selected ? "font-bold" : ""}
        hover:bg-gray-50
        focus-visible:bg-gray-50
        active:bg-gray-100
      `}
      onClick={onItemClick}
    >
      <div>{data.name}</div>
    </button>
  );
}
