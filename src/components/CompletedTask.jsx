import React from "react";
import { Box, Grid2 as Grid, Typography } from "@mui/material";
import TaskCard from "./TaskCard";

export default function CompletedTask({ tasks }) {
  const NoTaskAvailabe = (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant="h6" color="text.secondary">
        No completed tasks to show.
      </Typography>
    </Box>
  );

  const AvailableTasks = (
    <Grid container spacing={2}>
      {tasks
        .filter((task) => task.completed === true)
        .map((task, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={index}>
            <TaskCard task={task} completed />
          </Grid>
        ))}
    </Grid>
  );

  const Content =
    !tasks || tasks.length === 0 ? NoTaskAvailabe : AvailableTasks;

  return (
    <Box sx={{ p: 2, overflow: "scroll", scrollbarWidth: "none" }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Completed Tasks
      </Typography>
      {Content}
    </Box>
  );
}
