// src/components/Chat/Conversation.jsx
import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, CircularProgress, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  addMessage,
  updateMessageFeedback,
  selectActiveConversation,
  saveConversationAsync,
} from "../../redux/slices/conversationsSlice.js";
import ChatMessage from "./ChatMessage.jsx";
import ChatInput from "./ChatInput.jsx";
import ConversationRating from "../Feedback/ConversationRating.jsx";
import ShareConversation from "../Shared/ShareConversation.jsx";
import { getChatResponse } from "../../api/geminiApi.js";

const Conversation = () => {
  const dispatch = useDispatch();
  const activeConversation = useSelector(selectActiveConversation);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeConversation?.messages]);

  if (!activeConversation) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Typography variant="h6">
          Select a conversation or create a new one
        </Typography>
      </Box>
    );
  }

  const handleSendMessage = async (text) => {
    // Add user message to the conversation
    dispatch(
      addMessage({
        text,
        sender: "user",
        conversationId: activeConversation.id,
      })
    );

    // Set loading state
    setLoading(true);
    setError(null);

    try {
      // Get response from AI
      // const response = await getChatResponse(text);
      // For testing/development, use mock API
      const response = await getChatResponse(text);

      // Add AI response to the conversation
      dispatch(
        addMessage({
          text: response.text,
          sender: "ai",
          conversationId: activeConversation.id,
        })
      );

      // Save conversation
      dispatch(saveConversationAsync(activeConversation.id));
    } catch (err) {
      setError(err.message);
      console.error("Error getting AI response:", err);

      // Add error message
      dispatch(
        addMessage({
          text: err.message,
          sender: "ai",
          conversationId: activeConversation.id,
          isError: true,
        })
      );
    } finally {
      setLoading(false);
    }
  };

  const handleMessageFeedback = (messageId, feedbackType, value) => {
    dispatch(
      updateMessageFeedback({
        conversationId: activeConversation.id,
        messageId,
        feedbackType,
        value,
      })
    );
  };

  const handleRetry = async (originalMessageIndex) => {
    // Get the original user message
    const userMessage = activeConversation.messages[originalMessageIndex - 1];

    if (!userMessage || userMessage.sender !== "user") {
      return; // Safety check
    }

    // Set loading state
    setLoading(true);
    setError(null);

    try {
      // Get response from AI
      const response = await getChatResponse(userMessage.text);

      // Add AI response to the conversation
      dispatch(
        addMessage({
          text: response.text,
          sender: "ai",
          conversationId: activeConversation.id,
        })
      );
    } catch (err) {
      setError(err.message);

      // Add error message
      dispatch(
        addMessage({
          text: err.message,
          sender: "ai",
          conversationId: activeConversation.id,
          isError: true,
        })
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 2,
          borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
        }}
      >
        <Typography variant="h6">{activeConversation.title}</Typography>
        <ShareConversation conversationId={activeConversation.id} />
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          overflow: "auto",
          padding: 2,
        }}
      >
        {activeConversation.messages.map((message, index) => (
          <ChatInput
            key={message.id}
            message={message}
            onFeedback={(feedbackType, value) =>
              handleMessageFeedback(message.id, feedbackType, value)
            }
            onRetry={message.isError ? () => handleRetry(index) : null}
            isError={message.isError}
          />
        ))}

        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", padding: 2 }}>
            <CircularProgress size={24} />
          </Box>
        )}

        <div ref={messagesEndRef} />
      </Box>

      {activeConversation.feedback.submitted ? (
        <Box sx={{ padding: 2, borderTop: "1px solid rgba(0, 0, 0, 0.12)" }}>
          <Typography variant="subtitle2" gutterBottom>
            You've already rated this conversation:
          </Typography>
          <Typography variant="body2">
            Rating: {activeConversation.feedback.rating}/5
          </Typography>
          {activeConversation.feedback.text && (
            <Typography variant="body2">
              Your feedback: {activeConversation.feedback.text}
            </Typography>
          )}
        </Box>
      ) : (
        <ConversationRating conversationId={activeConversation.id} />
      )}

      <ChatInput onSendMessage={handleSendMessage} isLoading={loading} />
    </Box>
  );
};

export default Conversation;
