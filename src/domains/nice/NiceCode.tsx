import { ComponentPropsWithoutRef, forwardRef } from "react";

export type NiceCodeProps = ComponentPropsWithoutRef<"code">;

export const NiceCode = forwardRef<HTMLElement, NiceCodeProps>(
  ({ className, ...props }, ref): React.JSX.Element => {
    return (
      <code
        className={`${className} NiceCode bg-gray-100 px-1 text-[0.8em]`}
        ref={ref}
        {...props}
      />
    );
  },
);

NiceCode.displayName = "NiceCode";
