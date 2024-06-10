import { ComponentPropsWithoutRef, forwardRef } from "react";

export type NiceDetailsProps = ComponentPropsWithoutRef<"details"> & {
  summary: string;
};

export const NiceDetails = forwardRef<HTMLDetailsElement, NiceDetailsProps>(
  ({ children, className, ...props }, ref): JSX.Element => {
    return (
      <details
        className={`${className} NiceDetails
          border-x border-ginpei bg-white
          open:border-b
        `}
        ref={ref}
        {...props}
      >
        <summary
          className="
            sticky top-0 cursor-pointer border-y border-ginpei bg-white px-4 py-1 hover:bg-gray-50
          "
        >
          {props.summary}
        </summary>
        <div className="px-4 py-1">{children}</div>
      </details>
    );
  },
);

NiceDetails.displayName = "NiceDetails";
