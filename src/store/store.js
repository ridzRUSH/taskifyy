import { configureStore } from "@reduxjs/toolkit";
import tastReducer from "./task.slice.js";
import modalSlice from "./modal.slice.js";
export const store = configureStore({
  reducer: {
    tasks: tastReducer,
    modal: modalSlice,
  },
});
