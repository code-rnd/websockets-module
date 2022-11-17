import { useState } from "react";
import { MessageModel } from "../../../components";
import { websocket, WS_MESSAGE_METHODS } from "./use-websockets.const";
import { getStatus } from "./use-websockets.utils";

export const useWebsockets = () => {
  const [messages, setMessages] = useState<MessageModel[]>([]);

  const onopen = (message: MessageModel) => {
    websocket.onopen = (ev) => {
      websocket.send(JSON.stringify(message));
      console.log("Сокет открыт: ", getStatus(websocket.readyState));
    };
  };

  websocket.onmessage = (ev) => {
    const data: MessageModel = JSON.parse(ev.data);
    if (data.method === WS_MESSAGE_METHODS.MESSAGE) {
      setMessages((prev) => [...prev, data]);
    }
    console.log(data);
  };

  websocket.onclose = (ev) => {
    console.log("Сокет закрыт: ", getStatus(websocket.readyState));
  };

  const send = (message: MessageModel) => {
    websocket.send(JSON.stringify(message));
  };

  return { messages, onopen, send };
};
