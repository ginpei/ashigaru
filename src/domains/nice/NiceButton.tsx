import { ComponentPropsWithoutRef, forwardRef } from "react";

export type NiceButtonProps = ComponentPropsWithoutRef<"button">;

export const NiceButton = forwardRef<HTMLButtonElement, NiceButtonProps>(
  ({ className, ...props }, ref): JSX.Element => {
    return (
      <button
        className={`NiceButton ${className} border-[1px] border-ginpei px-4 py-1 text-ginpei`}
        ref={ref}
        {...props}
      />
    );
  }
);

NiceButton.displayName = "NiceButton";
