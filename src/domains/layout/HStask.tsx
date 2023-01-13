import { ComponentProps } from "react";

export type HStackProps = ComponentProps<"div"> & {
  gap?: string;
};

export function HStack({
  className = "",
  gap = "",
  style = {},
  ...props
}: HStackProps): JSX.Element {
  if (gap) {
    style.gap = gap;
  }

  return (
    <div
      className={`HStack flex flex-row gap-1 ${className}`}
      style={style}
      {...props}
    />
  );
}
