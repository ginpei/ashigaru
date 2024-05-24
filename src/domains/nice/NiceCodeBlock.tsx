import { ComponentPropsWithoutRef, forwardRef } from "react";

export type NiceCodeBlockProps = ComponentPropsWithoutRef<"pre">;

export const NiceCodeBlock = forwardRef<HTMLPreElement, NiceCodeBlockProps>(
  ({ className, children, ...props }, ref): JSX.Element => {
    const tailoredChildren =
      typeof children === "string" ? children.trim() : children;

    return (
      <pre
        className={`${className} NiceCodeBlock bg-gray-100 p-2 text-[0.8em]`}
        ref={ref}
        {...props}
      >
        {tailoredChildren}
      </pre>
    );
  },
);

NiceCodeBlock.displayName = "NiceCodeBlock";
