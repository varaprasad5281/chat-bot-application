// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import conversationsReducer from "./slices/conversationsSlice";
import uiReducer from "./slices/uiSlice";

export const store = configureStore({
  reducer: {
    conversations: conversationsReducer,
    ui: uiReducer,
  },
});

export default store;
