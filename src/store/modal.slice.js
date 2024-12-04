import { createSlice } from "@reduxjs/toolkit";

// Initial State
const initialState = {
  modalOpen: "",
  modalID: -1,
  filter: "", // Tracks whether the modal is open
};

// Modal Slice
const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    // Toggles the modal open state

    // Explicitly open the modal
    openForm: (state) => {
      state.modalOpen = "form";
    },

    openEditModal: (state, action) => {
      const id = action.payload;
      state.modalOpen = "edit";
      state.modalID = id;
    },
    openDelete: (state, action) => {
      const id = action.payload;
      state.modalID = id;

      state.modalOpen = "delete";
    },
    setFilter: (state, action) => {
      const filterParm = action.payload;
      state.filter = filterParm;
    },

    // Explicitly close the modal
    closeModal: (state) => {
      state.modalOpen = "";
      state.modalID = -1;
      state.filter = "";
    },
  },
});

// Export actions
export const { openForm, openEditModal, openDelete, closeModal, setFilter } =
  modalSlice.actions;

// Export reducer
export default modalSlice.reducer;
