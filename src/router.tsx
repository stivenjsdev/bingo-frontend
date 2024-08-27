import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import BallsDrawn from "./pages/BallsDrawn";
import GamePage from "./pages/GamePage";
import IndexPage from "./pages/IndexPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<IndexPage />} index />
          <Route path="/game" element={<GamePage />} />
          <Route path="/balls-drawn" element={<BallsDrawn />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
