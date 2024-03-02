import { ChangeEventHandler, useCallback } from "react";
import { NiceInput } from "../../../domains/nice/NiceInput";
import { ShapeData } from "../shape/ShapeData";

export interface LayoutFormProps {
  shape: Partial<ShapeData>;
  onChange: (shape: Partial<ShapeData>) => void;
}

export function LayoutForm({ shape, onChange }: LayoutFormProps): JSX.Element {
  const onInputChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      const { name, valueAsNumber: value } = event.target;
      if (!isObjectKey(shape, name)) {
        throw new Error(`Invalid key: ${name}`);
      }

      onChange({ [name]: value });
    },
    [onChange, shape],
  );

  return (
    <div className="flex flex-col gap-1 px-4">
      <h3 className="font-bold">Layout</h3>
      <label className="grid grid-cols-2">
        <span>Top</span>
        <NiceInput
          name="top"
          onChange={onInputChange}
          type="number"
          value={shape.top ?? ""}
        />
      </label>
      <label className="grid grid-cols-2">
        <span>Left</span>
        <NiceInput
          name="left"
          onChange={onInputChange}
          type="number"
          value={shape.left ?? ""}
        />
      </label>
      <label className="grid grid-cols-2">
        <span>Width</span>
        <NiceInput
          name="width"
          onChange={onInputChange}
          type="number"
          value={shape.width ?? ""}
        />
      </label>
      <label className="grid grid-cols-2">
        <span>Height</span>
        <NiceInput
          name="height"
          onChange={onInputChange}
          type="number"
          value={shape.height ?? ""}
        />
      </label>
    </div>
  );
}

// TODO extract
function isObjectKey<T extends object>(
  object: T,
  key: keyof any,
): key is keyof T {
  return key in object;
}
