import { ComponentPropsWithoutRef, forwardRef } from "react";

export type NiceCodeProps = ComponentPropsWithoutRef<"code">;

export const NiceCode = forwardRef<HTMLElement, NiceCodeProps>(
  ({ className, ...props }, ref): JSX.Element => {
    return (
      <code
        className={`${className} NiceCode px-1 text-[0.8em] bg-gray-100`}
        ref={ref}
        {...props}
      />
    );
  },
);

NiceCode.displayName = "NiceCode";
