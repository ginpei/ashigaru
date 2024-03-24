import { useEffect, useMemo, useState } from "react";
import { VStack } from "../../../layout/VStack";
import { NiceButton } from "../../../nice/NiceButton";
import { NiceH1 } from "../../../nice/NiceH";
import { StraightLayout } from "../../../pageLayout/straight/StraightLayout";
import { useNow } from "../../../time/timeHooks";
import { Dialog, DialogBody, DialogFooter, DialogHeader } from "../../Dialog";

export function DialogDemoPage(): JSX.Element {
  const [basicOpen, setBasicOpen] = useState(false);
  const [stubbornOpen, setStubbornOpen] = useState(false);

  return (
    <StraightLayout title="<Dialog> demo">
      <VStack>
        <NiceH1>{"<Dialog>"}</NiceH1>
        <p className="flex gap-4">
          <NiceButton onClick={() => setBasicOpen(true)}>
            Open basic dialog
          </NiceButton>
          <NiceButton onClick={() => setStubbornOpen(true)}>
            Open stubborn dialog
          </NiceButton>
        </p>
      </VStack>
      <DemoDialog onClose={() => setBasicOpen(false)} open={basicOpen} />
      <StubbornDialog
        onClose={() => setStubbornOpen(false)}
        open={stubbornOpen}
      />
    </StraightLayout>
  );
}

DialogDemoPage.path = "dialog/Dialog" as const;

function DemoDialog({
  onClose,
  open,
}: {
  onClose: () => void;
  open: boolean;
}): JSX.Element {
  return (
    <Dialog onClose={onClose} open={open}>
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

function StubbornDialog(props: {
  onClose: () => void;
  open: boolean;
}): JSX.Element {
  const waitTimeSec = 5000;

  const now = useNow();
  const [openedAt, setOpenedAt] = useState(Date.now());

  const elapse = useMemo(() => now - openedAt, [now, openedAt]);
  const remainingSec = useMemo(
    () => Math.ceil((waitTimeSec - elapse) / 1000),
    [elapse],
  );
  const readyToClose = useMemo(() => elapse >= waitTimeSec, [elapse]);

  useEffect(() => {
    setOpenedAt(Date.now());
  }, [props.open]);

  return (
    <Dialog open={props.open}>
      <DialogHeader>No Close</DialogHeader>
      <DialogBody>
        <div className="w-96">
          <p>
            You cannot close by clicking the backdrop or pressing the escape.
          </p>
        </div>
      </DialogBody>
      <div className="flex w-full items-center justify-between p-4">
        <span>{!readyToClose && `Wait for ${remainingSec} sec`}</span>
        <NiceButton disabled={!readyToClose} onClick={props.onClose}>
          Close explicitly
        </NiceButton>
      </div>
    </Dialog>
  );
}
