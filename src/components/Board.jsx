import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import IncompleteTask from "./IncompleteTask.jsx";
import CompletedTask from "./CompletedTask.jsx";
import { useSelector } from "react-redux";

const ResizableSplitPane = () => {
  const data = useSelector((state) => state.tasks.tasks);
  const [dividerPosition, setDividerPosition] = useState(50); // Percentage for the left pane width

  const handleMouseMove = (e) => {
    const newDividerPosition = (e.clientX / window.innerWidth) * 100; // Convert clientX to percentage
    setDividerPosition(Math.max(10, Math.min(90, newDividerPosition))); // Constrain between 10% and 90%
  };

  const handleMouseUp = () => {
    document.body.style.cursor = "default"; // Reset cursor
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleMouseDown = () => {
    document.body.style.cursor = "col-resize"; // Set resize cursor
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Left Pane */}
      <Box
        sx={{
          width: `${dividerPosition}%`,
          backgroundColor: "#f5f5f5",
          display: "flex",
        }}
      >
        <IncompleteTask tasks={data} />
      </Box>

      {/* Resizable Divider */}
      <Box
        sx={{
          width: "10px",
          cursor: "col-resize", // Ensure cursor shows on hover
          backgroundColor: "#1976d2",
          "&:hover": { backgroundColor: "#0d47a1" }, // Hover effect
        }}
        onMouseDown={handleMouseDown} // Start resizing
      />

      {/* Right Pane */}
      <Box
        sx={{
          width: `${100 - dividerPosition}%`,
          backgroundColor: "#e0e0e0",
          display: "flex",
        }}
      >
        <CompletedTask tasks={data} />
      </Box>
    </Box>
  );
};

export default ResizableSplitPane;
