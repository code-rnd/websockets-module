import { useCallback, useMemo } from "react";

import { websocket, WS_MESSAGE_METHODS } from "./use-websockets.const";
import { checkConnectStatus, checkOpenStatus } from "./use-websockets.utils";

export const useWebsockets = () => {
  /** Слушаем статус подключения */
  const onOpen = useCallback(() => {
    websocket.onopen = (ev) => {
      sendMessage({
        id: 1,
        userName: "Harry",
        method: WS_MESSAGE_METHODS.CONNECTION,
      });
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

  /** Отправляем данные */
  const sendMessage = useCallback(
    <T extends { method: WS_MESSAGE_METHODS; userName: string; id: number }>(
      data: T
    ) => {
      if (checkOpenStatus(websocket.readyState)) {
        websocket.send(JSON.stringify(data));
      }
    },
    []
  );

  const isConnect = useMemo(() => checkConnectStatus(websocket.readyState), []);

  const isOpen = useMemo(() => checkOpenStatus(websocket.readyState), []);

  return { onOpen, getMessage, onClose, sendMessage, isConnect, isOpen };
};
