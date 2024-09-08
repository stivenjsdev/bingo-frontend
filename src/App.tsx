import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

const socket = io("http://localhost:4000");

function App() {
  const [message] = useState("init");
  const [ballDrawn, setBallDrawn] = useState(0);

  useEffect(() => {
    console.log("hola mundo");
    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("ball drawn", ball => {
      console.log(ball);
      setBallDrawn(ball);
    })
  }, []);

  function handleMessage() {
    socket.emit("message", "Hello from the client!");
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <h1>{ballDrawn}</h1>
      <div className="card">
        <button onClick={handleMessage}>
          message is {message}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
