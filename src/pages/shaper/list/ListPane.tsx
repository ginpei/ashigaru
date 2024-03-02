import { MouseEventHandler } from "react";
import { useShaperPageStateContext } from "../page/shaperPageStateContext";
import { ShapeData } from "../shape/ShapeData";

export interface ListPaneProps {}

export function ListPane(): JSX.Element {
  const [{ selectedShapeIds, shapes }, setState] = useShaperPageStateContext();

  const onItemSelect: ShapeListItemProps["onSelect"] = (id, type) => {
    setState((state) => {
      const selected = state.selectedShapeIds.includes(id);
      const append = type === "append";
      let selectedShapeIds: typeof state.selectedShapeIds = [];
      if (append) {
        selectedShapeIds = selected
          ? state.selectedShapeIds.filter((i) => i !== id)
          : [...state.selectedShapeIds, id];
      } else {
        selectedShapeIds = [id];
      }

      return { ...state, selectedShapeIds };
    });
  };

  return (
    <div className="ListPane bg-white">
      <h2 className="font-bold">Shapes</h2>
      <div className="h-full border-t bg-gray-100">
        {shapes.map((shape) => (
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
