import { useEffect } from "react";

import { useGame } from "../hooks/useGame";

const IndexPage = () => {
  const { state, dispatch } = useGame();
  

  useEffect(() => {
  }, []);

  return (
    <div>
      <h1>{state.drawnBall}</h1>
      <h2>Bienvenid@ {state.player.name}</h2>
    </div>
  );
};

export default IndexPage;
