import { GoogleGenerativeAI } from "@google/generative-ai";

// Use a valid model name (replace 'gemini-2.0-flash' with the correct one)
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY; // Make sure the API key is set up correctly

console.log(API_KEY);
const genAI = new GoogleGenerativeAI({ apiKey: API_KEY });

export const getChatResponse = async (prompt) => {
  try {
    // Use a valid model name (replace 'Gemini 2.0 Flash-Lite' with the correct model name)
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Ensure that the contents are passed in the correct format expected by the API
    const response = await model.generateContent({
      contents: { text: prompt }, // Wrap the prompt in the expected 'text' object
    });

    // Extract and log the result from the response
    if (response && response.text) {
      const text = response.text; // Assuming 'text' is the result field
      console.log("AI response:", text);
      return { text };
    } else {
      throw new Error("No text field found in AI response.");
    }
  } catch (error) {
    console.error("Error generating AI response:", error.message || error);
    throw new Error(error.message || "Failed to get response from AI");
  }
};

// Fallback mock API in case the Gemini API is not available
// export const getMockChatResponse = async (prompt) => {
//   // Simulate network delay
//   await new Promise((resolve) => setTimeout(resolve, 1000));

//   // 60% chance of failure for the bonus task
//   if (Math.random() < 0.6) {
//     throw new Error("AI response failed - please try again");
//   }

//   const responses = [
//     "I'm happy to help you with that!",
//     "That's an interesting question. Let me think about it...",
//     "Based on my knowledge, I would suggest...",
//     "I don't have enough information to answer completely, could you provide more details?",
//     "Here's what I think about your question...",
//   ];

//   return { text: responses[Math.floor(Math.random() * responses.length)] };
// };
