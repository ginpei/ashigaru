import { useState } from "react";
import { VStack } from "../../../layout/VStack";
import { NiceButton } from "../../../nice/NiceButton";
import { NiceH1 } from "../../../nice/NiceH";
import { StraightLayout } from "../../../pageLayout/straight/StraightLayout";
import { Dialog, DialogBody, DialogFooter, DialogHeader } from "../../Dialog";

export function DialogDemoPage(): JSX.Element {
  const [open, setOpen] = useState(false);

  return (
    <StraightLayout title="<Dialog> demo">
      <VStack>
        <NiceH1>{"<Dialog>"}</NiceH1>
        <p>
          <NiceButton onClick={() => setOpen(!open)}>Open Dialog</NiceButton>
        </p>
      </VStack>
      <DemoDialog onClose={() => setOpen(false)} open={open} />
    </StraightLayout>
  );
}

DialogDemoPage.path = "dialog/Dialog" as const;

function DemoDialog(props: {
  onClose: () => void;
  open: boolean;
}): JSX.Element {
  const onClose = () => {
    props.onClose();
  };

  return (
    <Dialog onClose={onClose} open={props.open}>
      <DialogHeader onClose={onClose}>Hello World!</DialogHeader>
      <DialogBody>
        <div className="w-96">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
            quia non voluptate ad impedit animi, voluptates enim harum?
            Recusandae placeat id rem nihil harum ipsam voluptates similique
            animi est libero!
          </p>
        </div>
      </DialogBody>
      <DialogFooter>
        <NiceButton onClick={onClose}>OK</NiceButton>
      </DialogFooter>
    </Dialog>
  );
}
