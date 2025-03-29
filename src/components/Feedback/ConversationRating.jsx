// src/components/Feedback/ConversationRating.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Rating,
  TextField,
  Button,
  Collapse,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { submitConversationFeedback } from "../../redux/slices/conversationsSlice";

const ConversationRating = ({ conversationId }) => {
  const dispatch = useDispatch();
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    if (rating > 0) {
      dispatch(
        submitConversationFeedback({
          conversationId,
          rating,
          text: feedback,
        })
      );
      setShowRating(false);
    }
  };

  return (
    <Box sx={{ padding: 2, borderTop: "1px solid rgba(0, 0, 0, 0.12)" }}>
      {!showRating ? (
        <Button
          variant="outlined"
          size="small"
          onClick={() => setShowRating(true)}
        >
          Rate this conversation
        </Button>
      ) : (
        <Collapse in={showRating}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="subtitle2">
              How would you rate this conversation?
            </Typography>

            <Rating
              name="conversation-rating"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
              precision={1}
            />

            <TextField
              label="Additional feedback (optional)"
              multiline
              rows={2}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              variant="outlined"
              fullWidth
            />

            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={rating === 0}
              >
                Submit
              </Button>
              <Button variant="outlined" onClick={() => setShowRating(false)}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Collapse>
      )}
    </Box>
  );
};

export default ConversationRating;
