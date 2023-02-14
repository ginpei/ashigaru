import { Menu } from "@headlessui/react";
import { NiceButton } from "../nice/NiceButton";

export interface NiceMenuProps {}

export function NiceMenu({}: NiceMenuProps): JSX.Element {
  return (
    <Menu>
      {({ open }) => (
        <>
          <Menu.Button as="span">
            <NiceButton>Show menu {open ? "▲" : "▼"}</NiceButton>
          </Menu.Button>
          <Menu.Items className="absolute shadow-lg border flex flex-col">
            <Menu.Item>
              {({ active }) => (
                <a
                  className={`
                    border-b p-2
                    ${active && "bg-blue-500"}
                  `}
                  href="/account-settings"
                >
                  Account settings
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  className={`
                    border-b p-2
                    ${active && "bg-blue-500"}
                  `}
                  href="/account-settings"
                >
                  Documentation
                </a>
              )}
            </Menu.Item>
            <Menu.Item disabled>
              <span className="opacity-75">Invite a friend (coming soon!)</span>
            </Menu.Item>
          </Menu.Items>
        </>
      )}
    </Menu>
  );
}
