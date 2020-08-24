import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import { CustomForm } from "./custom_form";

const CustomDialog = ({ open, handleClose, action, initialData, title }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <CustomForm action={action} initialData={initialData} />
      </DialogContent>
    </Dialog>
  );
};

export { CustomDialog };
