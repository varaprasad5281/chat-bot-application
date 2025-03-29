// Enhanced version of ChatInput.jsx with text formatting support
import React, { useState, useRef } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import CodeIcon from "@mui/icons-material/Code";
import {
  formatBold,
  formatItalic,
  formatCode,
  handleKeyboardShortcuts,
} from "../../utils/textFormatter";

const ChatInput = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState("");
  const textFieldRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e) => {
    const textField = textFieldRef.current;
    if (!textField) return;

    const { selectionStart, selectionEnd } = textField;

    const result = handleKeyboardShortcuts(
      e,
      message,
      selectionStart,
      selectionEnd
    );
    if (result.text !== message) {
      setMessage(result.text);

      // Need to set cursor position after state update
      setTimeout(() => {
        textField.selectionStart = textField.selectionEnd =
          result.newCursorPosition;
      }, 0);
    }
  };

  const handleFormat = (formatFunction) => {
    const textField = textFieldRef.current;
    if (!textField) return;

    const { selectionStart, selectionEnd } = textField;

    // Only apply formatting if text is selected
    if (selectionStart !== selectionEnd) {
      const result = formatFunction(message, selectionStart, selectionEnd);
      setMessage(result.text);

      // Need to set cursor position after state update
      setTimeout(() => {
        textField.focus();
        textField.selectionStart = textField.selectionEnd =
          result.newCursorPosition;
      }, 0);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: 2,
        borderTop: "1px solid rgba(0, 0, 0, 0.12)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 1,
          mb: 1,
          alignItems: "center",
        }}
      >
        <Typography variant="caption" color="text.secondary">
          Formatting:
        </Typography>
        <Button
          size="small"
          variant="outlined"
          sx={{ minWidth: "auto", p: 0.5 }}
          onClick={() => handleFormat(formatBold)}
        >
          <FormatBoldIcon fontSize="small" />
        </Button>
        <Button
          size="small"
          variant="outlined"
          sx={{ minWidth: "auto", p: 0.5 }}
          onClick={() => handleFormat(formatItalic)}
        >
          <FormatItalicIcon fontSize="small" />
        </Button>
        <Button
          size="small"
          variant="outlined"
          sx={{ minWidth: "auto", p: 0.5 }}
          onClick={() => handleFormat(formatCode)}
        >
          <CodeIcon fontSize="small" />
        </Button>
        <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
          Shortcuts: Ctrl+B (Bold), Ctrl+I (Italic), Ctrl+K (Code)
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <TextField
          fullWidth
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          variant="outlined"
          disabled={isLoading}
          multiline
          maxRows={4}
          inputRef={textFieldRef}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          endIcon={<SendIcon />}
          disabled={!message.trim() || isLoading}
          sx={{ ml: 1, height: 56 }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatInput;
