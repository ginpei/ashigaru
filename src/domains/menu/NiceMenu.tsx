import { Menu } from "@headlessui/react";
import { NiceButton } from "../nice/NiceButton";
import { NiceMenuItem } from "./NiceMenuItem";

/**
 * @example
 * <NiceMenu>
 *   <NiceMenu.Button>Hi</NiceMenu.Button>
 *   <NiceMenu.Items>
 *     <NiceMenu.Item href="#demo-link">Demo link</NiceMenu.Item>
 *     <NiceMenu.Item onClick={() => console.log(`# click`)}>
 *       Documentation
 *     </NiceMenu.Item>
 *     <NiceMenu.Item disabled>
 *       Invite a friend (coming soon!)
 *     </NiceMenu.Item>
 *   </NiceMenu.Items>
 * </NiceMenu>
 */
export function NiceMenu({ ...props }: React.ComponentProps<typeof Menu>) {
  return <Menu {...props} />;
}

NiceMenu.Button = function NiceMenuButton({
  ...props
}: React.ComponentProps<typeof Menu.Button>) {
  return <Menu.Button as={NiceButton} {...props} />;
};

NiceMenu.Items = function NiceMenuItems({
  ...props
}: React.ComponentProps<typeof Menu.Items>) {
  return (
    <Menu.Items
      className="NiceMenu.Items absolute flex flex-col border bg-white shadow-lg"
      {...props}
    />
  );
};

NiceMenu.Item = NiceMenuItem;
