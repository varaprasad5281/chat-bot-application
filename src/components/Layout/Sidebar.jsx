// src/components/Layout/Sidebar.jsx
import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Drawer,
  Divider,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import FeedbackIcon from "@mui/icons-material/Feedback";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllConversations,
  selectActiveConversationId,
  setActiveConversation,
  createConversation,
} from "../../redux/slices/conversationsSlice";
import { toggleSidebar } from "../../redux/slices/uiSlice";

const drawerWidth = 280;

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const conversations = useSelector(selectAllConversations);
  const activeConversationId = useSelector(selectActiveConversationId);
  const sidebarOpen = useSelector((state) => state.ui.sidebarOpen);

  const handleSelectConversation = (id) => {
    dispatch(setActiveConversation(id));
    navigate("/");
  };

  const handleCreateConversation = () => {
    dispatch(createConversation());
    navigate("/");
  };

  const handleNavigateToFeedback = () => {
    navigate("/feedback");
  };

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={sidebarOpen}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
        }}
      >
        <Typography variant="h6" noWrap component="div">
          AI Chat App
        </Typography>
        <IconButton onClick={() => dispatch(toggleSidebar())}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider />

      <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          fullWidth
          onClick={handleCreateConversation}
        >
          New Conversation
        </Button>
      </Box>

      <Divider />

      <List>
        <ListItemButton onClick={handleNavigateToFeedback}>
          <ListItemIcon>
            <FeedbackIcon />
          </ListItemIcon>
          <ListItemText primary="Feedback Overview" />
        </ListItemButton>
      </List>

      <Divider />

      <Typography
        variant="subtitle2"
        sx={{ px: 2, py: 1, color: "text.secondary" }}
      >
        Your Conversations
      </Typography>

      <List sx={{ flexGrow: 1, overflow: "auto" }}>
        {conversations.length > 0 ? (
          conversations.map((conversation) => (
            <ListItem key={conversation.id} disablePadding>
              <ListItemButton
                selected={conversation.id === activeConversationId}
                onClick={() => handleSelectConversation(conversation.id)}
              >
                <ListItemIcon>
                  <ChatIcon />
                </ListItemIcon>
                <ListItemText
                  primary={conversation.title}
                  secondary={new Date(
                    conversation.updatedAt
                  ).toLocaleDateString()}
                />
              </ListItemButton>
            </ListItem>
          ))
        ) : (
          <ListItem>
            <ListItemText
              primary="No conversations yet"
              secondary="Start a new conversation to begin chatting with AI"
            />
          </ListItem>
        )}
      </List>
    </Drawer>
  );
};

export default Sidebar;
