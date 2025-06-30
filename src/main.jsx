import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { ChatContext, ChatContextProvider } from "./context/ChatContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <ChatContextProvider>
    <StrictMode>
      <App />
    </StrictMode>
    </ChatContextProvider>
  </AuthContextProvider>
);
