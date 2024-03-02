import { CSSProperties, HTMLAttributes } from "react";

export interface GridFrameProps {
  children: React.ReactNode;
  className?: HTMLAttributes<HTMLDivElement>["className"];
  gap?: CSSProperties["gap"];
  gridTemplate: CSSProperties["gridTemplate"];
  style?: HTMLAttributes<HTMLDivElement>["style"];
}

export interface GridAreaProps {
  area: CSSProperties["gridArea"];
  children: React.ReactNode;
  scroll?: boolean;
}

export function GridFrame({
  children,
  className,
  gap,
  gridTemplate,
  style,
}: GridFrameProps): JSX.Element {
  return (
    <div
      className={`GridFrame grid ${className}`}
      style={{ ...style, gap, gridTemplate }}
    >
      {children}
    </div>
  );
}

export function GridArea({
  area,
  children,
  scroll,
}: GridAreaProps): JSX.Element {
  return (
    <div
      className={`GridArea grid ${scroll ? "overflow-auto" : ""}`}
      style={{ gridArea: area }}
    >
      {children}
    </div>
  );
}
