import { FC, useCallback, useEffect, useLayoutEffect, useState } from "react";

import s from "./WsContainer.module.scss";
import { rndHash } from "./WsContainer.const";

export const WsContainer: FC = () => {
  // const { messages, typingUser, onopen, send } = useWebsockets() || {};
  const [text, setText] = useState("");
  const [name, setName] = useState("");

  const id = rndHash;

  // onopen({
  //   userId: id,
  //   user: name,
  //   messageId: (+new Date()).toString(16),
  //   method: WS_MESSAGE_METHODS.CONNECTION,
  //   date: new Date(),
  // });

  const onSendMessage = useCallback(() => {
    // const message: MessageModel = {
    //   userId: id,
    //   user: name,
    //   messageId: (+new Date()).toString(16),
    //   method: WS_MESSAGE_METHODS.MESSAGE,
    //   date: new Date(),
    //   text,
    // };

    // send(message);
    setText("");
  }, [text, name]);

  const onSendTypingStart = useCallback(() => {
    // const message: MessageModel = {
    //   userId: id,
    //   user: name,
    //   messageId: (+new Date()).toString(16),
    //   method: WS_MESSAGE_METHODS.TYPING_START,
    //   date: new Date(),
    //   text,
    // };
    // send(message);
  }, [text, name]);

  const onSendTypingEnd = useCallback(() => {
    // const message: MessageModel = {
    //   userId: id,
    //   user: name,
    //   messageId: (+new Date()).toString(16),
    //   method: WS_MESSAGE_METHODS.TYPING_END,
    //   date: new Date(),
    //   text,
    // };
    // send(message);
  }, [text, name]);

  useEffect(() => {
    if (!text) {
      onSendTypingEnd();
      return;
    }

    const interval = setInterval(() => {
      onSendTypingStart();
    }, 500);

    return () => clearInterval(interval);
  }, [text, name, onSendTypingStart, onSendTypingEnd]);

  useLayoutEffect(() => {
    const userName = window.prompt("Your name?");
    setName(userName || rndHash);
  }, []);

  useEffect(() => {
    return () => {
      // const message: MessageModel = {
      //   userId: id,
      //   user: name,
      //   messageId: (+new Date()).toString(16),
      //   method: WS_MESSAGE_METHODS.DISCONNECTION,
      //   date: new Date(),
      // };
      // send(message);
    };
  }, []);

  return (
    <div className={s.container}>
      {/*<Chat userId={id} messages={messages} />*/}
      {/*<TypingLabel typingUser={typingUser} />*/}
      {/*<Form text={text} setText={setText} onSubmit={onSendMessage} />*/}
    </div>
  );
};
