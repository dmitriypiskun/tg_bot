import { useEffect } from "react";

export const useTelegram = () => {
  const tg = window.Telegram.WebApp;

  useEffect(() => {
    tg.ready();
  }, [tg]);

  return {
    tg,
    user: tg.initDataUnsafe.user,
  };
};
