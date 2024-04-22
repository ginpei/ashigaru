import { ComponentPropsWithoutRef, forwardRef } from "react";

export type NiceCodeBlockProps = ComponentPropsWithoutRef<"pre">;

export const NiceCodeBlock = forwardRef<HTMLPreElement, NiceCodeBlockProps>(
  ({ className, ...props }, ref): JSX.Element => {
    return (
      <pre
        className={`${className} NiceCodeBlock bg-gray-100 p-2 text-[0.8em]`}
        ref={ref}
        {...props}
      />
    );
  },
);

NiceCodeBlock.displayName = "NiceCodeBlock";
