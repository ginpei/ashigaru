import { ReactEventHandler, SyntheticEvent, useEffect } from "react";

export function useModalOpen(
  refDialog: React.RefObject<HTMLDialogElement>,
  open: boolean,
) {
  useEffect(() => {
    const elDialog = refDialog.current;
    if (!elDialog) {
      return;
    }

    toggleModal(elDialog, open);
  }, [open, refDialog]);
}

function toggleModal(elDialog: HTMLDialogElement, open: boolean) {
  if (open && elDialog.open === false) {
    elDialog.showModal();
  } else if (!open && elDialog.open === true) {
    elDialog.close();
  }
}

export function useModalCloseByBackdrop(
  refDialog: React.RefObject<HTMLDialogElement>,
  onBackdropClick: (
    event: Event | SyntheticEvent<HTMLDialogElement, Event>,
  ) => void,
) {
  useEffect(() => {
    const elDialog = refDialog.current;
    if (!elDialog) {
      return;
    }

    function handleClick(event: Event) {
      if (event.target === elDialog) {
        onBackdropClick(event);
      }
    }

    elDialog.addEventListener("click", handleClick);

    return () => {
      elDialog.removeEventListener("click", handleClick);
    };
  }, [onBackdropClick, refDialog]);
}
