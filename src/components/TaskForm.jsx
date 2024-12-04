import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import LowPriorityIcon from "@mui/icons-material/LowPriority";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useDispatch, useSelector } from "react-redux";
import { addTask, updateTask } from "../store/task.slice";
import { closeModal } from "../store/modal.slice";

export default function TaskForm({ edit = false, taskId = null }) {
  const dispatch = useDispatch();

  // Fetch the task for editing if `edit` is true
  const task = useSelector((state) =>
    edit ? state.tasks.tasks.find((t) => t.id === taskId) : null
  );

  // State for form data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: null,
    endDate: null,
    importance: "medium",
  });

  // Populate the form data when editing
  useEffect(() => {
    if (edit && task) {
      setFormData({
        title: task.title,
        description: task.description,
        startDate: task.startDate ? dayjs(task.startDate) : null,
        endDate: task.endDate ? dayjs(task.endDate) : null,
        importance: task.importance,
      });
    }
  }, [edit, task]);

  // Handle changes in form fields
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.title.trim() &&
      formData.description.trim() &&
      formData.startDate &&
      formData.endDate &&
      dayjs(formData.startDate).isBefore(dayjs(formData.endDate))
    ) {
      if (edit) {
        dispatch(updateTask({ ...formData, id: taskId }));
      } else {
        dispatch(addTask(formData));
      }
      dispatch(closeModal());
    }
  };

  // Importance options
  const importanceOptions = [
    { value: "low", label: "Low", icon: <LowPriorityIcon /> },
    { value: "medium", label: "Medium", icon: <StarBorderIcon /> },
    { value: "high", label: "High", icon: <PriorityHighIcon /> },
  ];

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 500,
          mx: "auto",
          p: 3,
          backgroundColor: "#f9f9f9",
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <Typography variant="h5" gutterBottom>
          {edit ? "Edit Task" : "Create Task"}
        </Typography>

        <TextField
          label="Title"
          fullWidth
          required
          margin="normal"
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />

        <TextField
          label="Description"
          fullWidth
          multiline
          rows={3}
          margin="normal"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />

        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <DatePicker
            label="Start Date"
            value={formData.startDate}
            onChange={(date) => handleChange("startDate", date)}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
          <DatePicker
            label="End Date"
            value={formData.endDate}
            onChange={(date) => handleChange("endDate", date)}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </Box>

        <TextField
          label="Level of Importance"
          select
          fullWidth
          margin="normal"
          value={formData.importance}
          onChange={(e) => handleChange("importance", e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {
                  importanceOptions.find(
                    (option) => option.value === formData.importance
                  )?.icon
                }
              </InputAdornment>
            ),
          }}
        >
          {importanceOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.icon} {option.label}
            </MenuItem>
          ))}
        </TextField>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          {edit ? "Update Task" : "Create Task"}
        </Button>
      </Box>
    </LocalizationProvider>
  );
}
