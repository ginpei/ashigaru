import { ComponentPropsWithoutRef, forwardRef } from "react";

export type NiceButtonProps = ComponentPropsWithoutRef<"button">;

export const NiceButton = forwardRef<HTMLButtonElement, NiceButtonProps>(
  ({ className, ...props }, ref): JSX.Element => {
    return (
      <button
        className={`NiceButton ${className}
          border border-ginpei px-4 py-1 text-ginpei
          hover:border-gray-400
        `}
        ref={ref}
        {...props}
      />
    );
  },
);

NiceButton.displayName = "NiceButton";
