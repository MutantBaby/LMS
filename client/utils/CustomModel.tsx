"use client";

import { FC } from "react";
import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";

interface Props {
  open: boolean;
  Component: any;
  activeItems: any;
  setOpen: (open: boolean) => void;
  setRoute: (route: string) => void;
}

const CustomModel: FC<Props> = ({
  open,
  setOpen,
  setRoute,
  Component,
  activeItems,
}) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box
        className={`absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-8px`}>
        <Component setRoute={setRoute} setOpen={setOpen} />
      </Box>
    </Modal>
  );
};

export default CustomModel;
