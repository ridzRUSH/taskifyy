import React from "react";
import { Box, Typography, Grid2 as Grid } from "@mui/material";
import { useSelector } from "react-redux";
import TaskCard from "./TaskCard"; // Assuming you already have the TaskCard component

export default function FilterBoard({ filterParms, search = "" }) {
  const tasks = useSelector((state) => state.tasks.tasks);

  // Function to check if the task is overdue
  const isOverdue = (task) => {
    return task.endDate && new Date(task.endDate) < new Date();
  };

  // Function to check if the task is completed
  const isCompleted = (task) => {
    return task.completed;
  };

  // Function to check if the task is incomplete
  const isIncomplete = (task) => {
    return !task.completedDate;
  };

  // Function to check if the task is due today
  const isDueToday = (task) => {
    return (
      task.endDate &&
      new Date(task.endDate).toLocaleDateString() ===
        new Date().toLocaleDateString()
    );
  };

  // Filter tasks based on the filterParams
  let filteredTasks = [];
  if (filterParms === "alltask") {
    filteredTasks = tasks;
  } else if (filterParms === "incompleteTask") {
    filteredTasks = tasks.filter(isIncomplete);
  } else if (filterParms === "dueTask") {
    filteredTasks = tasks.filter(isDueToday);
  } else if (filterParms === "overDueTask") {
    filteredTasks = tasks.filter(isOverdue);
  } else if (filterParms === "completed") {
    filteredTasks = tasks.filter(isCompleted); // Filtering completed tasks
  } else if (filterParms === "search") {
    const searchRegex = new RegExp(search, "i");
    filteredTasks = tasks.filter((task) => searchRegex.test(task.title));
  }

  // If no tasks match the filter, display message
  if (filteredTasks.length === 0) {
    let message = "No tasks to show";

    if (filterParms === "completed") {
      message = "No completed tasks";
    } else if (filterParms === "incomplete") {
      message = "No pending tasks";
    } else if (filterParms === "overdue") {
      message = "No overdue tasks";
    } else if (filterParms === "search") {
      message = `No tasks found matching "${search}"`;
    }

    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "200px",
          textAlign: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h4" color="text.secondary" fontWeight="bold">
          {message}
        </Typography>
        {filterParms === "search" && (
          <Typography variant="body1" color="text.secondary" mt={1}>
            Try refining your search query.
          </Typography>
        )}
      </Box>
    );
  }

  return (
    <Box sx={{ py: 2 }}>
      {/* Grid container to display the task cards */}
      <Grid container spacing={3}>
        {filteredTasks.map((task) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={task.id}>
            <TaskCard
              task={task} // Replace with your dispatch function
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
