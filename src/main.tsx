// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GameProvider } from "./context/GameContext";
import "./index.css";
import AppRouter from "./router.tsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
    <GameProvider>
      <AppRouter />
    </GameProvider>
  // </StrictMode>
);
