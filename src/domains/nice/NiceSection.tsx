import { ComponentPropsWithoutRef, ReactNode, forwardRef } from "react";
import { NiceH1, NiceH2, NiceH3 } from "./NiceH";

export type NiceSectionProps = ComponentPropsWithoutRef<"section"> & {
  as?: "section" | "article" | "div";
  heading: ReactNode;
  level: "1" | "2" | "3";
};

const HeadingMap = {
  1: NiceH1,
  2: NiceH2,
  3: NiceH3,
} as const;

const gapMap = {
  1: "gap-16",
  2: "gap-8",
  3: "gap-4",
} as const;

export const NiceSection = forwardRef<HTMLDivElement, NiceSectionProps>(
  (
    { as: Tag = "section", className, children, level, ...props },
    ref,
  ): React.JSX.Element => {
    const H = HeadingMap[level];
    const gapClass = gapMap[level];
    return (
      <Tag
        className={`${className} NiceSection flex flex-col ${gapClass}`}
        ref={ref}
        {...props}
      >
        <H>{props.heading}</H>
        {children}
      </Tag>
    );
  },
);

NiceSection.displayName = "NiceSection";
