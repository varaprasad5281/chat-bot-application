// src/pages/ChatPage.jsx
import React from "react";
import { Box, Toolbar } from "@mui/material";
import Conversation from "../components/chat/Conversation.jsx";

const ChatPage = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        height: "calc(100vh - 64px)",
        marginTop: "64px",
      }}
    >
      <Conversation />
    </Box>
  );
};

export default ChatPage;
