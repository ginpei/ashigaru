import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { NiceButton } from "../nice/NiceButton";
import { NiceMenuItem } from "./NiceMenuItem";

/**
 * @example
 * <NiceMenu>
 *   <NiceMenu.Button>Hi</NiceMenu.Button>
 *   <NiceMenuItems>
 *     <NiceMenu.Item href="#demo-link">Demo link</NiceMenu.Item>
 *     <NiceMenu.Item onClick={() => console.log(`# click`)}>
 *       Documentation
 *     </NiceMenu.Item>
 *     <NiceMenu.Item disabled>
 *       Invite a friend (coming soon!)
 *     </NiceMenu.Item>
 *   </NiceMenuItems>
 * </NiceMenu>
 */
export function NiceMenu({ ...props }: React.ComponentProps<typeof Menu>) {
  return <Menu {...props} />;
}

NiceMenu.Button = function NiceMenuButton({
  ...props
}: React.ComponentProps<typeof MenuButton>) {
  return <MenuButton as={NiceButton} {...props} />;
};

NiceMenu.Items = function NiceMenuItems({
  ...props
}: React.ComponentProps<typeof MenuItems>) {
  return (
    <MenuItems
      className="NiceMenuItems absolute flex flex-col border bg-white shadow-lg"
      {...props}
    />
  );
};

NiceMenu.Item = NiceMenuItem;
