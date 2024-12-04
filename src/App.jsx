import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"; // Import necessary components
import Box from "@mui/material/Box";
import Header from "./components/Header";
import FilterBar from "./components/FilterBar";
import Board from "./components/Board";
import Modal from "./components/Modal";
import FilterBoard from "./components/FilterBoard";
import TaskDetails from "./components/TaskDetails"; // Assuming you will create this component
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "./store/modal.slice";

function App() {
  const filter = useSelector((state) => state.modal.filter);
  const dispatcher = useDispatch();
  const [searchField, setSearchField] = useState("");

  // Search handler to update searchField and set filter to "search"
  const onSearch = (searchText) => {
    setSearchField(searchText);
    dispatcher(setFilter("search"));
  };

  return (
    <Router>
      {" "}
      {/* Wrap the entire app with Router */}
      <Box sx={{ overflow: "hidden" }}>
        <Header onSearch={onSearch} />
        <FilterBar />

        {/* Define routes with dynamic parameters */}
        <Routes>
          {/* Route for the task list */}
          <Route
            path="/task"
            element={
              filter !== "" ? (
                <FilterBoard
                  filterParms={filter}
                  search={filter === "search" ? searchField : ""}
                />
              ) : (
                <Board />
              )
            }
          />

          {/* Route for a specific task with dynamic id */}
          <Route
            path="/task/:id"
            element={<TaskDetails />} // Create TaskDetails component to render details
          />

          {/* Redirect from the root path to '/task' */}
          <Route path="/" element={<Navigate to="/task" />} />
        </Routes>

        <Modal />
      </Box>
    </Router>
  );
}

export default App;
