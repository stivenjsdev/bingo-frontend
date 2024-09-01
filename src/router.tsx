import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Layout from "./layouts/Layout";
import BallsDrawnPage from "./pages/BallsDrawnPage";
import GamePage from "./pages/GamePage";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<IndexPage />} index />
          <Route path="/game" element={<GamePage />} />
          <Route path="/balls-drawn" element={<BallsDrawnPage />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
