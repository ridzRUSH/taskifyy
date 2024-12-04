import React from "react";
import {
  Typography,
  Paper,
  Box,
  IconButton,
  Button,
  LinearProgress,
  Link,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { toggleTaskCompletion } from "../store/task.slice";
import { openDelete, openEditModal } from "../store/modal.slice";
import dayjs from "dayjs";

export default function TaskCard({
  task,
  completed = false,
  onEdit,
  onDelete,
  onDone,
}) {
  const dispatcher = useDispatch();

  // Handlers
  function onEdit(id) {
    dispatcher(openEditModal(id));
  }

  function onDelete(id) {
    dispatcher(openDelete(id));
  }

  function onDone(id) {
    dispatcher(toggleTaskCompletion(id));
  }

  // Calculate Progress
  const today = dayjs();
  const startDate = dayjs(task.startDate);
  const endDate = dayjs(task.endDate);
  const totalDuration = endDate.diff(startDate, "days");
  const elapsedDuration = today.diff(startDate, "days");
  const daysRemaining = endDate.diff(today, "days");

  const progress = completed
    ? 100
    : Math.min(Math.max((elapsedDuration / totalDuration) * 100, 0), 100);

  // Determine Color
  let progressColor = "primary"; // Default
  if (completed) {
    progressColor = "success"; // Green
  } else if (daysRemaining === 1) {
    progressColor = "error"; // Red
  } else if (daysRemaining > 1) {
    progressColor = "warning"; // Yellow
  }

  return (
    <Paper
      elevation={4}
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: 2,
        border: `2px solid ${completed ? "#b4e197" : "#ffcccb"}`,
        backgroundColor: completed ? "#f0f9e8" : "#fffafa",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          {task.title}
        </Typography>
        <Box>
          {!completed && (
            <IconButton color="primary" onClick={() => onEdit(task.id)}>
              <EditIcon fontSize="small" />
            </IconButton>
          )}
          <IconButton color="error" onClick={() => onDelete(task.id)}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {/* Task Description */}
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ flexGrow: 1, mb: 2 }}
      >
        {task.description}
      </Typography>

      {/* Progress Bar */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="caption" color="text.secondary">
          Progress: {Math.round(progress)}%
        </Typography>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{ height: 10, borderRadius: 5, mt: 1 }}
          color={progressColor}
        />
      </Box>

      {/* Footer */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 2,
        }}
      >
        {completed && (
          <Typography
            variant="caption"
            sx={{
              fontStyle: "italic",
              color: "text.secondary",
            }}
          >
            Completed on: {task.completedDate}
          </Typography>
        )}
        {!completed && (
          <Button
            variant="outlined"
            color="success"
            size="small"
            onClick={() => onDone(task.id)}
          >
            Done
          </Button>
        )}
        <Link
          href={`/task/${task.id}`}
          underline="hover"
          color="primary"
          variant="body2"
        >
          View Details
        </Link>
      </Box>
    </Paper>
  );
}
