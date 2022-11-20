import { FC, memo, useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";

import { Chat, Form, TypingLabel, MessageModel } from "../Chat";
import { chatApi, WS_MESSAGE_METHODS } from "../../api";
import { useMessages } from "./hooks";

/** TODO: Затипизировать */
export const selectorMessages = (e: any) => {
  return e.meta;
};
export const selectorUser = (e: any) => {
  return e.meta;
};
/** TODO: вьюха для теста, все перевести в редакс или react-квери */
export const View: FC = memo(() => {
  useMessages();
  const messagesQuery = useQuery("pack/Message", selectorMessages);
  const messages = (messagesQuery.data as MessageModel[]) || [];

  const userDtoQuery = useQuery("form/User", selectorUser);
  const userDto = userDtoQuery?.data || ({} as any);

  const [text, setText] = useState("");

  const sendMessageHandler = useCallback(
    (method: WS_MESSAGE_METHODS) => {
      const message: MessageModel = {
        userId: userDto.id,
        user: userDto.name,
        messageId: (+new Date()).toString(16),
        method,
        date: new Date(),
        text,
        color: userDto.color,
      };

      chatApi.postMessage<MessageModel>(message);
      if (method === WS_MESSAGE_METHODS.MESSAGE) {
        setText("");
      }
    },
    [userDto, text]
  );

  useEffect(() => {
    let interval: NodeJS.Timer;
    if (!text) {
      sendMessageHandler(WS_MESSAGE_METHODS.TYPING_END);
      return;
    }

    interval = setInterval(() => {
      sendMessageHandler(WS_MESSAGE_METHODS.TYPING_START);
    }, 100);

    return () => clearInterval(interval);
  }, [text, sendMessageHandler]);

  return (
    <>
      <Chat messages={messages} userId={userDto.id} />
      <TypingLabel />
      <Form text={text} setText={setText} onSubmit={sendMessageHandler} />
    </>
  );
});
