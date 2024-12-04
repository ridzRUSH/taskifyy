import {
  Box,
  Typography,
  Grid2 as Grid,
  IconButton,
  Button,
} from "@mui/material";
import React from "react";
import TaskCard from "./TaskCard";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { openForm } from "../store/modal.slice";
export default function IncompleteTask({ tasks }) {
  const dispatcher = useDispatch();

  function handleAddTask() {
    dispatcher(openForm());
  }

  const NoTaskAvailable = (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant="h6" color="text.secondary">
        No incomplete tasks to show.
      </Typography>
    </Box>
  );

  const AvailableTask = (
    <Grid container spacing={2}>
      {tasks
        .filter((task) => task.completed === false)
        .map((task, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={index}>
            <TaskCard task={task} />
          </Grid>
        ))}
    </Grid>
  );

  const Content =
    !tasks || tasks.length === 0 ? NoTaskAvailable : AvailableTask;

  return (
    <Box mx={1} sx={{ overflow: "scroll", scrollbarWidth: "none" }}>
      <Box>
        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center", // Ensure vertical alignment
          }}
        >
          <Typography variant="h5" sx={{ mb: 0, flexGrow: 1 }}>
            Assigned Tasks
          </Typography>

          <Button
            variant="contained"
            startIcon={<AddIcon fontSize="small" />}
            sx={{ ml: 2 }} // Add left margin to create spacing from the Typography
            onClick={handleAddTask}
          >
            Add Task
          </Button>
        </Box>

        {Content}
      </Box>
    </Box>
  );
}
