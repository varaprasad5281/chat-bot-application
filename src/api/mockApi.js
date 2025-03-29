// src/api/mockApi.js
// Mock API for simulating server interactions

// Simulates saving a conversation to a server
export const saveConversation = async (conversation) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate server response
  return {
    data: {
      ...conversation,
      savedToServer: true,
      serverTimestamp: new Date().toISOString(),
    },
  };
};

// Mock function to generate a shareable link
export const generateShareableLink = (conversationId) => {
  return `${window.location.origin}/shared/${conversationId}`;
};
