import { useCallback } from "react";

import { websocket } from "./use-websockets.const";
import { checkConnectStatus, checkOpenStatus } from "./use-websockets.utils";

export const useWebsockets = () => {
  /** Слушаем статус подключения */
  const onOpen = useCallback(() => {
    websocket.onopen = (ev) => {
      if (checkConnectStatus(websocket.readyState)) {
        console.log("Подключение установлено (клиент): ", { ev });
      }
    };
  }, []);

  /** Слушаем сообщения */
  const getMessage = useCallback(() => {
    websocket.onmessage = (ev) => {
      if (checkOpenStatus(websocket.readyState)) {
        console.log("Сообщение от сервера: ", { data: ev.data });
      }
    };
  }, []);

  /** Слушаем статус подключения */
  const onClose = useCallback(() => {
    websocket.onclose = (ev) => {
      console.log("Close: ", { ev });
    };
  }, []);

  /** Отправлчем данные */
  const sendData = useCallback(<T>(data: T) => {
    if (checkOpenStatus(websocket.readyState)) {
      const dataString = JSON.stringify(data);
      websocket.send(dataString);
    }
  }, []);

  return { onOpen, getMessage, onClose, sendData };
};
