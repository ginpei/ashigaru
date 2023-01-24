import Link from "next/link";
import { ComponentProps } from "react";

export function NiceLink(props: ComponentProps<typeof Link>): JSX.Element {
  const { className = "", ...otherProps } = props;
  return (
    <Link
      className={`
        ${className} text-blue-700 underline
        hover:text-red-700 focus:text-red-700
      `}
      {...otherProps}
    />
  );
}
