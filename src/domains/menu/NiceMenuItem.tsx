import { MenuItem } from "@headlessui/react";
import { ComponentPropsWithoutRef } from "react";

export type NiceMenuItemProps = ButtonProps | LinkProps;

type ButtonProps = ComponentPropsWithoutRef<"button">;

type LinkProps = ComponentPropsWithoutRef<"a"> & { disabled?: boolean };

export function NiceMenuItem(props: NiceMenuItemProps): React.JSX.Element {
  return (
    <MenuItem disabled={props.disabled}>
      {({ disabled, focus }) =>
        isButtonProps(props) ? (
          <button
            className={`border-b p-2 text-start no-underline ${
              !focus && !disabled && "text-inherit"
            } ${focus && "bg-blue-500 text-white"} ${
              disabled && "text-gray-400"
            }`}
            disabled={disabled}
            {...props}
          />
        ) : (
          <a
            className={`border-b p-2 text-start no-underline ${
              !focus && !disabled && "text-inherit"
            } ${focus && "bg-blue-500 text-white"} ${
              disabled && "text-gray-400"
            }`}
            {...props}
          />
        )
      }
    </MenuItem>
  );
}

function isButtonProps(props: NiceMenuItemProps): props is ButtonProps {
  return props.disabled || !("href" in props);
}
