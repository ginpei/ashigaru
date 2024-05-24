import { MouseEventHandler } from "react";
import { NiceButton } from "../../../domains/nice/NiceButton";
import { useCommand } from "../../../domains/action/commandContext";
import { useShaperPageStateContext } from "../page/shaperPageStateContext";
import { ShapeData } from "../shape/ShapeData";

export interface ListPaneProps {}

export function ListPane(): JSX.Element {
  const [{ selectedShapeIds, shapes }, setState] = useShaperPageStateContext();
  const addShape = useCommand("addShape");
  const selectShape = useCommand("selectShape");

  const reverseShapes = shapes.toReversed();

  const onAddClick: MouseEventHandler<HTMLButtonElement> = () => {
    addShape?.exec();
  };

  const onItemSelect: ShapeListItemProps["onSelect"] = (id, type) => {
    selectShape?.exec([id], type);
  };

  return (
    <div className="ListPane bg-white">
      <div className="flex justify-between">
        <h2 className="p-2 text-xs font-bold">Shapes</h2>
        <span>
          <NiceButton onClick={onAddClick}>+</NiceButton>
        </span>
      </div>
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
