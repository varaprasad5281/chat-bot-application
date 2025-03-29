// src/redux/slices/conversationsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { saveConversation } from "../../api/mockApi";

export const saveConversationAsync = createAsyncThunk(
  "conversations/saveConversation",
  async (conversationId, { getState }) => {
    const state = getState();
    const conversation = state.conversations.byId[conversationId];
    const response = await saveConversation(conversation);
    return response.data;
  }
);

const conversationsSlice = createSlice({
  name: "conversations",
  initialState: {
    byId: {},
    allIds: [],
    activeConversationId: null,
    status: "idle",
    error: null,
  },
  reducers: {
    createConversation: (state) => {
      const id = uuidv4();
      const newConversation = {
        id,
        title: `New Conversation ${state.allIds.length + 1}`,
        messages: [],
        feedback: {
          rating: null,
          text: "",
          submitted: false,
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      state.byId[id] = newConversation;
      state.allIds.push(id);
      state.activeConversationId = id;
    },
    setActiveConversation: (state, action) => {
      state.activeConversationId = action.payload;
    },
    addMessage: (state, action) => {
      const { text, sender, conversationId } = action.payload;
      const messageId = uuidv4();

      const message = {
        id: messageId,
        text,
        sender,
        timestamp: new Date().toISOString(),
        feedback: {
          thumbsUp: false,
          thumbsDown: false,
        },
      };

      const targetConversationId = conversationId || state.activeConversationId;

      if (state.byId[targetConversationId]) {
        state.byId[targetConversationId].messages.push(message);
        state.byId[targetConversationId].updatedAt = new Date().toISOString();
      }
    },
    updateMessageFeedback: (state, action) => {
      const { conversationId, messageId, feedbackType, value } = action.payload;

      const conversation = state.byId[conversationId];
      if (conversation) {
        const message = conversation.messages.find(
          (msg) => msg.id === messageId
        );
        if (message) {
          if (feedbackType === "thumbsUp") {
            message.feedback.thumbsUp = value;
            // If thumbs up is true, thumbs down should be false
            if (value) message.feedback.thumbsDown = false;
          } else if (feedbackType === "thumbsDown") {
            message.feedback.thumbsDown = value;
            // If thumbs down is true, thumbs up should be false
            if (value) message.feedback.thumbsUp = false;
          }
        }
      }
    },
    submitConversationFeedback: (state, action) => {
      const { conversationId, rating, text } = action.payload;

      if (state.byId[conversationId]) {
        state.byId[conversationId].feedback = {
          rating,
          text,
          submitted: true,
        };
        state.byId[conversationId].updatedAt = new Date().toISOString();
      }
    },
    updateConversationTitle: (state, action) => {
      const { conversationId, title } = action.payload;

      if (state.byId[conversationId]) {
        state.byId[conversationId].title = title;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveConversationAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(saveConversationAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Update the conversation with any changes from the server
        state.byId[action.payload.id] = action.payload;
      })
      .addCase(saveConversationAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  createConversation,
  setActiveConversation,
  addMessage,
  updateMessageFeedback,
  submitConversationFeedback,
  updateConversationTitle,
} = conversationsSlice.actions;

export const selectAllConversations = (state) =>
  state.conversations.allIds.map((id) => state.conversations.byId[id]);

export const selectConversationById = (state, conversationId) =>
  state.conversations.byId[conversationId];

export const selectActiveConversation = (state) =>
  state.conversations.byId[state.conversations.activeConversationId];

export const selectActiveConversationId = (state) =>
  state.conversations.activeConversationId;

export default conversationsSlice.reducer;
