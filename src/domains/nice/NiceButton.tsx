import { ComponentPropsWithoutRef } from "react";

export type NiceButtonProps = ComponentPropsWithoutRef<"button">;

export function NiceButton({
  className,
  ...props
}: NiceButtonProps): JSX.Element {
  return (
    <button
      className={`NiceButton ${className} border-[1px] border-ginpei px-4 py-1 text-ginpei`}
      {...props}
    />
  );
}
