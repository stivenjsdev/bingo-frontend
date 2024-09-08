import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GameProvider } from "./context/GameContext";
import "./index.css";
import AppRouter from "./router.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GameProvider>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
        {/* <ReactQueryDevtools /> */}
      </QueryClientProvider>
    </GameProvider>
  </StrictMode>
);
