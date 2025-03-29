// src/App.jsx
import React, { useMemo } from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./components/Layout/Header";
import Sidebar from "./components/Layout/Sidebar";
import ChatPage from "./pages/ChatPage";
import FeedbackPage from "./pages/FeedbackPage";

const App = () => {
  const darkMode = useSelector((state) => state.ui.darkMode);
  const sidebarOpen = useSelector((state) => state.ui.sidebarOpen);

  // Create a dynamic theme based on the dark mode state
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          primary: {
            main: "#1976d2",
          },
          secondary: {
            main: "#9c27b0",
          },
        },
      }),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div style={{ display: "flex" }}>
          <Header />
          <Sidebar />
          <main
            style={{
              flexGrow: 1,
              padding: 0,
              transition: theme.transitions.create("margin", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
              marginLeft: 0,
              ...(sidebarOpen && {
                transition: theme.transitions.create("margin", {
                  easing: theme.transitions.easing.easeOut,
                  duration: theme.transitions.duration.enteringScreen,
                }),
                marginLeft: 280,
              }),
            }}
          >
            <Routes>
              <Route path="/" element={<ChatPage />} />
              <Route path="/feedback" element={<FeedbackPage />} />
              <Route path="/shared/:conversationId" element={<ChatPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
