import React from "react";
import { useParams } from "react-router-dom"; // Import useParams to access dynamic URL parameters
import { useSelector } from "react-redux";
import { Box, Typography, Grid, Paper } from "@mui/material"; // Material UI components

const TaskDetails = () => {
  const { id } = useParams(); // Get the task ID from the URL
  const tasks = useSelector((state) => state.tasks.tasks); // Assuming tasks are stored in Redux
  const task = tasks.find((task) => task.id === parseInt(id)); // Find the task by ID

  if (!task) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h4" color="error">
          Task not found
        </Typography>
      </Box>
    ); // Show a message if no task is found with that ID
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
        padding: 2,
      }}
    >
      <Paper
        sx={{
          width: "100%",
          maxWidth: "900px",
          padding: 4,
          backgroundColor: "#fff",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h3" gutterBottom align="center">
          {task.title}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5" fontWeight="bold">
              Description:
            </Typography>
            <Typography variant="body1">{task.description}</Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" fontWeight="bold">
              Importance:
            </Typography>
            <Typography variant="body1">{task.importance}</Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" fontWeight="bold">
              Start Date:
            </Typography>
            <Typography variant="body1">
              {new Date(task.startDate).toLocaleString()}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" fontWeight="bold">
              End Date:
            </Typography>
            <Typography variant="body1">
              {new Date(task.endDate).toLocaleString()}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" fontWeight="bold">
              Status:
            </Typography>
            <Typography
              variant="body1"
              color={task.completed ? "green" : "red"}
              fontWeight="bold"
            >
              {task.completed ? "Completed" : "Incomplete"}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default TaskDetails;
