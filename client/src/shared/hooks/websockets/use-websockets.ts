import { useState } from "react";
import { MessageModel } from "../../../components";

export const useWebsockets = () => {
  const [messages, setMessages] = useState<MessageModel[]>([]);
  const [typingUser, setTypingUser] = useState<MessageModel>();

  // const onopen = (message: MessageModel) => {
  //   websocket.onopen = (ev) => {
  //     websocket.send(JSON.stringify(message));
  //     console.log("Сокет открыт: ", getStatus(websocket.readyState));
  //   };
  // };

  // websocket.onmessage = (ev) => {
  //   const data: MessageModel = JSON.parse(ev.data);
  //   if (data.method === WS_MESSAGE_METHODS.CONNECTION) {
  //     console.log("Пользователь: " + data.user + " подключился к чату");
  //   }
  //   if (data.method === WS_MESSAGE_METHODS.MESSAGE) {
  //     setMessages((prev) => [...prev, data]);
  //   }
  //   if (data.method === WS_MESSAGE_METHODS.TYPING_START) {
  //     setTypingUser(data);
  //   }
  //   if (data.method === WS_MESSAGE_METHODS.TYPING_END) {
  //     setTypingUser(undefined);
  //   }
  //   if (data.method === WS_MESSAGE_METHODS.DISCONNECTION) {
  //     console.log("Пользователь: " + data.user + " вышел");
  //   }
  // };
  //
  // websocket.onclose = (ev) => {
  //   console.log("Сокет закрыт: ", getStatus(websocket.readyState));
  // };
  //
  // const send = (message: MessageModel) => {
  //   if (websocket.readyState === 1) {
  //     websocket.send(JSON.stringify(message));
  //   }
  // };

  return {};
};
