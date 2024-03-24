import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "../../../domains/dialog/Dialog";
import { NiceButton } from "../../../domains/nice/NiceButton";

export interface ShortcutListDialogProps {
  onClose: () => void;
  open: boolean;
}

export function ShortcutListDialog({
  onClose,
  open,
}: ShortcutListDialogProps): JSX.Element {
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogHeader onClose={onClose}>Shortcuts</DialogHeader>
      <DialogBody>
        <div className="w-96">
          <p>TODO</p>
        </div>
      </DialogBody>
    </Dialog>
  );
}
