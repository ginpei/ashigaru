import { XMarkIcon } from "@heroicons/react/24/outline";
import { SyntheticEvent, createRef, useCallback } from "react";
import { useModalCloseByBackdrop, useModalOpen } from "./dialogHooks";

export interface DialogProps {
  children: React.ReactNode;
  onClose?: () => void;
  open: boolean;
}

/**
 * @example
 * function DemoDialog({
 *   onClose,
 *   open,
 * }: {
 *   onClose: () => void;
 *   open: boolean;
 * }): JSX.Element {
 *   return (
 *     <Dialog onClose={onClose} open={open}>
 *       <DialogHeader onClose={onClose}>Hello World!</DialogHeader>
 *       <DialogBody>
 *         <div className="w-96">
 *           <p>Lorem ipsum...</p>
 *         </div>
 *       </DialogBody>
 *       <DialogFooter>
 *         <NiceButton onClick={onClose}>OK</NiceButton>
 *       </DialogFooter>
 *     </Dialog>
 *   );
 * }
 */
export function Dialog({ children, onClose, open }: DialogProps): JSX.Element {
  const refDialog = createRef<HTMLDialogElement>();

  useModalOpen(refDialog, open);

  // TODO trap focus

  const onDialogClose = useCallback(
    (event: Event | SyntheticEvent<HTMLDialogElement, Event>) => {
      event.preventDefault();
      onClose?.();
    },
    [onClose],
  );
  useModalCloseByBackdrop(refDialog, onDialogClose);

  return (
    <dialog
      className="Dialog bg-transparent shadow-lg"
      ref={refDialog}
      onCancel={(v) => onDialogClose(v)}
      onClose={(v) => onDialogClose(v)}
    >
      <div
        className="
          min-w-96 overflow-auto rounded border border-ginpei bg-white
          backdrop:bg-stone-500/25
        "
      >
        {children}
      </div>
    </dialog>
  );
}

export interface DialogHeaderProps {
  children: React.ReactNode;
  onClose?: () => void;
}

export function DialogHeader({ children, onClose }: DialogHeaderProps) {
  return (
    <header
      className="
        DialogHeader
        flex justify-between
        bg-ginpei
        text-white
      "
    >
      <h1 className="px-4 py-1">{children}</h1>
      {onClose && (
        <button
          className="
          px-4 py-1
          hover:bg-stone-500/25
        "
          onClick={onClose}
          title="Close"
        >
          <XMarkIcon className="w-4" />
        </button>
      )}
    </header>
  );
}

export function DialogBody({ children }: { children: React.ReactNode }) {
  return <div className="DialogBody p-4">{children}</div>;
}

export function DialogFooter({ children }: { children: React.ReactNode }) {
  return <div className="DialogFooter flex justify-end p-4">{children}</div>;
}
