import { FC, memo, useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";

import { Chat, Form, TypingLabel, MessageModel } from "../Chat";
import { chatApi, WS_MESSAGE_METHODS } from "../../api";
import { rndHash } from "../../shared";
import { useMessages } from "./hooks";

/** TODO: Затипизировать */
const getMessages = (e: any) => {
  return e.meta;
};

/** TODO: вьюха для теста, все перевести в редакс или react-квери */
export const View: FC = memo(() => {
  useMessages();
  const messagesQuery = useQuery("pack/Message", getMessages);
  const messages = (messagesQuery.data as MessageModel[]) || [];

  const name = rndHash + "_salt";

  const [text, setText] = useState("");

  const sendMessageHandler = useCallback(
    (method: WS_MESSAGE_METHODS) => {
      console.log("TUT");
      const message: MessageModel = {
        userId: name,
        user: name,
        messageId: (+new Date()).toString(16),
        method,
        date: new Date(),
        text,
      };

      chatApi.postMessage<MessageModel>(message);
      if (method === WS_MESSAGE_METHODS.MESSAGE) {
        setText("");
      }
    },
    [name, text]
  );

  useEffect(() => {
    let interval: NodeJS.Timer;
    if (!text) {
      sendMessageHandler(WS_MESSAGE_METHODS.TYPING_END);
      return;
    }

    interval = setInterval(() => {
      sendMessageHandler(WS_MESSAGE_METHODS.TYPING_START);
    }, 500);

    return () => clearInterval(interval);
  }, [text, sendMessageHandler]);

  return (
    <>
      <Chat messages={messages} userId={name} />
      <TypingLabel />
      <Form text={text} setText={setText} onSubmit={sendMessageHandler} />
    </>
  );
});
