import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import TaskForm from "./TaskForm";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../store/modal.slice";
import Delete from "./Delete";

export default function ResponsiveDialog() {
  const modalOpen = useSelector((state) => state.modal.modalOpen);
  const taskId = useSelector((state) => state.modal.modalID);
  const dispatcher = useDispatch();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    dispatcher(closeModal());
  };
  let Content = <></>;
  let Title = "";
  if (modalOpen === "form") {
    Content = <TaskForm />;
    Title = "Add Task ";
  } else if (modalOpen === "edit") {
    Content = <TaskForm taskId={taskId} edit={true} />;
    Title = "Edit Task ";
  } else if (modalOpen === "delete") {
    Title = " Delete Task ";
    Content = <Delete />;
  }
  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={modalOpen != "" ? true : false}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          id="responsive-dialog-title"
        >
          {Title}
          <DialogActions>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogActions>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{Content}</DialogContentText>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
