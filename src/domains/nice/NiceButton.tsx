import { ComponentPropsWithoutRef, forwardRef } from "react";

export type NiceButtonProps = ComponentPropsWithoutRef<"button">;

export const NiceButton = forwardRef<HTMLButtonElement, NiceButtonProps>(
  ({ className, ...props }, ref): JSX.Element => {
    return (
      <button
        className={`NiceButton ${className}
          border border-ginpei bg-white px-4 py-1 text-ginpei
          hover:bg-gray-50
          focus:bg-gray-50
          disabled:border-gray-400 disabled:bg-gray-100 disabled:text-gray-400
        `}
        ref={ref}
        {...props}
      />
    );
  },
);

NiceButton.displayName = "NiceButton";
