import { createSlice } from "@reduxjs/toolkit";
import demo_tasks from "./tempTask";
// Initial State
const initialState = {
  tasks: [...demo_tasks],
};

// Task Slice
const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // Add a task
    addTask: (state, action) => {
      const { title, description, startDate, endDate, importance } =
        action.payload;
      const newTask = {
        id: new Date().getTime(), // Generate unique ID
        title,
        description,
        importance,
        startDate: startDate.toISOString(), // Serialize date
        endDate: endDate.toISOString(), // Serialize date
        completed: false, // Default status
      };
      state.tasks.push(newTask);
    },

    // Delete a task by ID
    deleteTask: (state, action) => {
      const taskId = action.payload; // Payload contains the ID of the task to delete
      state.tasks = state.tasks.filter((task) => task.id !== taskId);
    },

    // Update a task by ID
    updateTask: (state, action) => {
      const { id, ...updates } = action.payload; // Payload contains task ID and updates
      console.log(id, updates);

      // Convert dates to ISO format if they exist
      if (updates.startDate) {
        updates.startDate = updates.startDate.toISOString();
      }
      if (updates.endDate) {
        updates.endDate = updates.endDate.toISOString();
      }

      const taskIndex = state.tasks.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = {
          ...state.tasks[taskIndex],
          ...updates, // Apply updates to the task
        };
      }
    },

    // Toggle completion status
    toggleTaskCompletion: (state, action) => {
      const taskId = action.payload; // Payload contains the ID of the task
      const task = state.tasks.find((task) => task.id === taskId);
      if (task) {
        task.completed = !task.completed;
      }
    },
  },
});

// Export actions
export const { addTask, deleteTask, updateTask, toggleTaskCompletion } =
  taskSlice.actions;

// Export reducer
export default taskSlice.reducer;
