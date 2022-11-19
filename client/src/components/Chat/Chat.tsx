import { FC, memo, useEffect, useLayoutEffect, useState } from "react";

import { Message } from "./components";

import { MessageModel, rndHash } from "../WsContainer";
import {
  chatApi,
  WebSoketMessage,
  WS_MESSAGE_METHODS,
} from "../../api/controllers";

import s from "./Chat.module.scss";

const mockMessage = {
  messageId: "messageId_123",
  sessionId: "sessionId_123",
  method: WS_MESSAGE_METHODS.CONNECTION,
  date: new Date(),
};

export const Chat: FC = memo(() => {
  const [messages, setMessages] = useState<MessageModel[]>([]);

  const id = rndHash;
  console.log({ id });

  useLayoutEffect(() => {
    chatApi.connect(mockMessage);
  });

  useEffect(() => {
    chatApi.subscribeAllMessage<WebSoketMessage>({
      [WS_MESSAGE_METHODS.CONNECTION]: console.log,
      [WS_MESSAGE_METHODS.DISCONNECTION]: console.log,
      [WS_MESSAGE_METHODS.MESSAGE]: console.log,
      [WS_MESSAGE_METHODS.TYPING_START]: console.log,
      [WS_MESSAGE_METHODS.TYPING_END]: console.log,
      [WS_MESSAGE_METHODS.NONE]: console.log,
    });
    chatApi.unsubscribeClose(console.log);
    return () => chatApi.disconnect();
  }, []);

  return (
    <div className={s.chat}>
      {messages.map((message) => (
        <Message
          isHost={message.userId === id}
          message={message}
          key={message.messageId}
        />
      ))}
    </div>
  );
});
