import React from "react";
import { Box, Button, Paper, IconButton } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CloseIcon from "@mui/icons-material/Close";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../store/modal.slice";

export default function FilterBar() {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.modal.filter);

  // Handle filter button click
  const handleFilterClick = (filterType) => {
    if (filter === filterType) {
      dispatch(setFilter("")); // If already selected, toggle off
    } else {
      dispatch(setFilter(filterType)); // Dispatch the selected filter type
    }
  };

  // Handle clearing the filter
  const clearFilter = () => {
    dispatch(setFilter("")); // Clear the filter by dispatching an empty string
  };

  return (
    <Box
      sx={{
        boxShadow: 1,
        display: "flex",
        py: "4px",
        overflow: "scroll",
        scrollBehavior: "auto",
        scrollbarWidth: "none",
      }}
    >
      <Paper
        sx={{
          display: "flex",
          flexGrow: 1,
          p: "4px",
          gap: 3,
          alignItems: "center",
        }}
      >
        {/* Main Filters Button */}
        <Button
          variant="outlined"
          startIcon={filter !== "" ? <FilterAltOffIcon /> : <FilterAltIcon />}
          onClick={clearFilter}
        >
          {filter !== "" ? "Clear Filters" : "Filters"}
        </Button>

        {/* Filter Buttons */}
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant={filter === "alltask" ? "contained" : "outlined"}
            style={{ borderRadius: 45 }}
            color="secondary"
            onClick={() => handleFilterClick("alltask")}
          >
            All Tasks
            {filter === "alltask" && (
              <IconButton size="small" onClick={clearFilter} sx={{ ml: 1 }}>
                <CloseIcon fontSize="small" />
              </IconButton>
            )}
          </Button>

          <Button
            variant={filter === "completed" ? "contained" : "outlined"}
            style={{ borderRadius: 45 }}
            color="success"
            onClick={() => handleFilterClick("completed")}
          >
            Completed Task
            {filter === "completed" && (
              <IconButton size="small" onClick={clearFilter} sx={{ ml: 1 }}>
                <CloseIcon fontSize="small" />
              </IconButton>
            )}
          </Button>

          <Button
            variant={filter === "incomplete" ? "contained" : "outlined"}
            style={{ borderRadius: 45 }}
            color="error"
            onClick={() => handleFilterClick("incomplete")}
          >
            Pending Task
            {filter === "incomplete" && (
              <IconButton size="small" onClick={clearFilter} sx={{ ml: 1 }}>
                <CloseIcon fontSize="small" />
              </IconButton>
            )}
          </Button>

          <Button
            variant={filter === "overdue" ? "contained" : "outlined"}
            style={{ borderRadius: 45 }}
            color="error"
            onClick={() => handleFilterClick("overdue")}
          >
            Overdue Task
            {filter === "overdue" && (
              <IconButton size="small" onClick={clearFilter} sx={{ ml: 1 }}>
                <CloseIcon fontSize="small" />
              </IconButton>
            )}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
