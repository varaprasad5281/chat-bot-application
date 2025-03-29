// src/components/Shared/ShareConversation.jsx
import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { generateShareableLink } from "../../api/mockApi";

const ShareConversation = ({ conversationId }) => {
  const [open, setOpen] = useState(false);
  const [shareableLink, setShareableLink] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleOpen = () => {
    // Generate a shareable link for the conversation
    const link = generateShareableLink(conversationId);
    setShareableLink(link);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareableLink);
    setSnackbarOpen(true);
  };

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<ShareIcon />}
        size="small"
        onClick={handleOpen}
      >
        Share
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Share Conversation</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            variant="outlined"
            value={shareableLink}
            InputProps={{
              readOnly: true,
              endAdornment: (
                <IconButton onClick={handleCopy} edge="end">
                  <ContentCopyIcon />
                </IconButton>
              ),
            }}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Link copied to clipboard!
        </Alert>
      </Snackbar>
    </>
  );
};

export default ShareConversation;
