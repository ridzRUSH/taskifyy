import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../store/modal.slice";
import { deleteTask } from "../store/task.slice";

export default function Delete() {
  const taskId = useSelector((state) => state.modal.modalID);
  const dispatcher = useDispatch();
  function handleClose() {
    dispatcher(closeModal());
  }
  function onDelete(id) {
    dispatcher(deleteTask(id));
    handleClose();
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 4,
        maxWidth: 400,
        margin: "auto",
        backgroundColor: "#fff",
      }}
    >
      {/* Title */}
      <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
        Do you want to delete this item?
      </Typography>

      {/* Action Buttons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2, // Space between buttons
          mt: 2,
        }}
      >
        <Button variant="outlined" color="primary" onClick={handleClose}>
          No
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => onDelete(taskId)}
        >
          Yes
        </Button>
      </Box>
    </Box>
  );
}
