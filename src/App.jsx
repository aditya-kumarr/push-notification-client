import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SubscribeButton from "./components/SubscribeButton.jsx";
import SendNotificationButton from "./components/SendNotificationButton.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <SubscribeButton />
    </>
  );
}

export default App;
