import { ComponentPropsWithoutRef, forwardRef } from "react";

export type NiceDetailsProps = ComponentPropsWithoutRef<"details">;
export type NiceSummaryProps = ComponentPropsWithoutRef<"summary">;

export const NiceDetails = forwardRef<HTMLDetailsElement, NiceDetailsProps>(
  ({ className, ...props }, ref): JSX.Element => {
    return (
      <details
        className={`
          ${className} NiceDetails
          border rounded
          [&>summary]:cursor-pointer [&>summary]:px-4 [&>summary]:py-2 [&>summary]:bg-slate-100 [&[open]>summary]:border-b
          [&>summary:hover]:bg-slate-200
          [&>.NideDetails-content]:p-4
        `}
        ref={ref}
        {...props}
      />
    );
  },
);

NiceDetails.displayName = "NiceDetails";
