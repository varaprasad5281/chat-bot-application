// src/components/Chat/ChatMessage.jsx
import React, { useState } from "react";
import { Box, Typography, IconButton, Paper } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const ChatMessage = ({
  message,
  onFeedback,
  onRetry = null,
  showFeedbackControls = true,
  isError = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { text, sender, feedback } = message;

  const isUser = sender === "user";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isUser ? "row-reverse" : "row",
        marginBottom: 2,
        alignItems: "flex-start",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Box sx={{ margin: 1 }}>
        {isUser ? (
          <AccountCircleIcon color="primary" />
        ) : (
          <SmartToyIcon color="secondary" />
        )}
      </Box>

      <Paper
        elevation={1}
        sx={{
          padding: 2,
          maxWidth: "70%",
          backgroundColor: isUser
            ? "primary.light"
            : isError
            ? "error.light"
            : "background.paper",
          color: isUser ? "white" : "text.primary",
          borderRadius: 2,
        }}
      >
        {isError ? (
          <Box display="flex" alignItems="center" marginBottom={1}>
            <ErrorOutlineIcon color="error" sx={{ marginRight: 1 }} />
            <Typography variant="body1" color="error">
              Error getting AI response
            </Typography>
          </Box>
        ) : null}

        <Typography variant="body1">{text}</Typography>

        {!isUser &&
          showFeedbackControls &&
          (isHovered || feedback.thumbsUp || feedback.thumbsDown) && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 1,
                opacity: isHovered ? 1 : 0.7,
              }}
            >
              {isError && onRetry && (
                <Button
                  size="small"
                  variant="outlined"
                  color="primary"
                  onClick={onRetry}
                  sx={{ marginRight: 1 }}
                >
                  Retry
                </Button>
              )}

              <IconButton
                size="small"
                color={feedback.thumbsUp ? "primary" : "default"}
                onClick={() => onFeedback("thumbsUp", !feedback.thumbsUp)}
              >
                <ThumbUpIcon fontSize="small" />
              </IconButton>

              <IconButton
                size="small"
                color={feedback.thumbsDown ? "error" : "default"}
                onClick={() => onFeedback("thumbsDown", !feedback.thumbsDown)}
              >
                <ThumbDownIcon fontSize="small" />
              </IconButton>
            </Box>
          )}
      </Paper>
    </Box>
  );
};

export default ChatMessage;
