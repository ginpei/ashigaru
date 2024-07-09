import { useMemo, useState } from "react";
import {
  Dialog,
  DialogBody,
  DialogHeader,
} from "../../../domains/dialog/Dialog";
import { useShaperPageActions } from "../action/shaperPageActionHooks";
import { ShaperPageState } from "./ShaperPageState";

export interface ShortcutListDialogProps {
  onClose: () => void;
  open: boolean;
}

export function ShortcutListDialog({
  onClose,
  open,
}: ShortcutListDialogProps): React.JSX.Element {
  const list = useShortcutList();

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogHeader onClose={onClose}>Shortcuts</DialogHeader>
      <DialogBody>
        <div className="w-96">
          {list.map((v) => (
            <div
              key={`${v.commandId}--${v.when}--${v.key}`}
              className="flex justify-between"
            >
              <div>{v.title}</div>
              <div>{v.key}</div>
              <div>{v.when ? `${v.when}` : <i>Global</i>}</div>
            </div>
          ))}
        </div>
      </DialogBody>
    </Dialog>
  );
}

function useShortcutList() {
  const [state, setSate] = useState<ShaperPageState>(
    null as unknown as ShaperPageState, // dummy
  );
  const [commands, shortcuts] = useShaperPageActions(state, setSate);

  const list = useMemo(
    () =>
      shortcuts.map((shortcut) => {
        const commandId = shortcut.commandId;
        const command = commands.find((v) => v.id === commandId);
        if (!command) {
          throw new Error(`Command not found: ${commandId}`);
        }

        const item = {
          commandId: commandId,
          title: command.title,
          key: shortcut.keyboard,
          when: shortcut.when,
        };
        return item;
      }),
    [commands, shortcuts],
  );

  return list;
}
