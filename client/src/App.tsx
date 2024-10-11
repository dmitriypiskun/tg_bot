import { useEffect } from "react";
import "./App.css";

const tg = window.Telegram.WebApp;

function App() {
  useEffect(() => {
    tg.ready();
  }, []);

  const handleClose = () => {
    tg.close();
  };

  return (
    <div className="">
      Content
      <button onClick={handleClose}>Close</button>
    </div>
  );
}

export default App;
