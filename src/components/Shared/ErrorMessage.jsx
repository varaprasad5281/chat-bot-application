// src/components/Shared/ErrorMessage.jsx
import React from "react";
import { Alert, AlertTitle, Box, Button } from "@mui/material";

const ErrorMessage = ({ message, onRetry, showRetry = true }) => {
  return (
    <Box sx={{ margin: 2 }}>
      <Alert
        severity="error"
        action={
          showRetry && onRetry ? (
            <Button color="inherit" size="small" onClick={onRetry}>
              Retry
            </Button>
          ) : null
        }
      >
        <AlertTitle>Error</AlertTitle>
        {message}
      </Alert>
    </Box>
  );
};

export default ErrorMessage;
