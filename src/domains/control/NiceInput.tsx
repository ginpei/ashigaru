import { ComponentPropsWithoutRef } from "react";

export type NiceInputProps = ComponentPropsWithoutRef<"input">;

export function NiceInput({
  className,
  ...props
}: NiceInputProps): JSX.Element {
  return (
    <input
      className={`NiceInput ${className} border-[1px] border-ginpei px-4 py-1 text-black`}
      {...props}
    />
  );
}
