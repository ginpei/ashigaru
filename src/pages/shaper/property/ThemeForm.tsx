import { ChangeEventHandler, useCallback } from "react";
import { NiceCode } from "../../../domains/nice/NiceCode";
import { NiceColorInput } from "../../../domains/nice/NiceColorInput";
import { ShapeData } from "../shape/ShapeData";

export interface ThemeFormProps {
  shape: ShapeData;
  onChange: (shape: ShapeData) => void;
}

export function ThemeForm({ shape, onChange }: ThemeFormProps): JSX.Element {
  const onInputChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      const { name, value } = event.target;
      if (!isObjectKey(shape, name)) {
        throw new Error(`Invalid key: ${name}`);
      }

      onChange({ ...shape, [name]: value });
    },
    [onChange, shape],
  );

  return (
    <div className="flex flex-col gap-1 px-4">
      <h3 className="font-bold">Theme</h3>
      <label className="grid grid-cols-2">
        <span>Color</span>
        <span>
          <NiceColorInput
            className="size-6"
            name="color"
            onChange={onInputChange}
            value={shape.color}
          />{" "}
          <NiceCode>{shape.color}</NiceCode>
        </span>
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
