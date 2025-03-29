// src/components/Layout/DarkModeToggle.jsx
import React from "react";
import { IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../../redux/slices/uiSlice";

const DarkModeToggle = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.ui.darkMode);

  return (
    <IconButton
      color="inherit"
      onClick={() => dispatch(toggleDarkMode())}
      aria-label={darkMode ? "switch to light mode" : "switch to dark mode"}
    >
      {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
};

export default DarkModeToggle;
