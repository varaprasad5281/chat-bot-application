// src/pages/FeedbackPage.jsx
import React from "react";
import { Box, Toolbar } from "@mui/material";
import FeedbackOverview from "../components/Feedback/FeedbackOverview";

const FeedbackPage = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        height: "calc(100vh - 64px)",
        marginTop: "64px",
      }}
    >
      <FeedbackOverview />
    </Box>
  );
};

export default FeedbackPage;
