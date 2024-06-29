import { ComponentPropsWithoutRef } from "react";

export type NiceColorInputProps = ComponentPropsWithoutRef<"input">;

export function NiceColorInput({
  className,
  ...props
}: NiceColorInputProps): React.JSX.Element {
  return (
    <input
      className={`NiceColorInput ${className}
        cursor-pointer border-[1px] border-transparent p-0
        invalid:border-red-500
        invalid:bg-red-100
        invalid:ring-red-500 read-only:bg-transparent
        hover:border-gray-400
      `}
      type="color"
      {...props}
    />
  );
}
