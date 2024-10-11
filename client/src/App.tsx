import { useEffect } from "react";
import styles from "./app.module.css";
import { Button, Header } from "./components";

const tg = window.Telegram.WebApp;

function App() {
  useEffect(() => {
    tg.ready();
  }, []);

  const handleClose = () => {
    tg.close();
  };

  return (
    <div className={styles["container"]}>
      <Header>
        <span>{tg.initDataUnsafe?.user?.username}</span>
        <Button title="Close" onClick={handleClose} />
      </Header>
    </div>
  );
}

export default App;
