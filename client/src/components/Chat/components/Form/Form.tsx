import {
  FC,
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

import { apiWebsockets } from "../../../../api";

import { WS_MESSAGE_METHODS } from "../../../../api/controllers";

import s from "./Form.module.scss";

export const Form: FC = memo(() => {
  const [text, setText] = useState("");
  const [name, setName] = useState("Codernd");

  const sendMessageHandle = useCallback((method: WS_MESSAGE_METHODS) => {
    apiWebsockets.postMessage({
      messageId: "messageId_123",
      sessionId: "sessionId_123",
      method,
      date: new Date(),
    });
  }, []);

  useEffect(() => {
    if (!text) {
      sendMessageHandle(WS_MESSAGE_METHODS.TYPING_END);
      return;
    }

    const interval = setInterval(() => {
      sendMessageHandle(WS_MESSAGE_METHODS.TYPING_START);
    }, 500);

    return () => clearInterval(interval);
  }, [text, name, sendMessageHandle]);

  useLayoutEffect(() => {
    // const userName = window.prompt("Your name?");
    // setName(userName || rndHash);
  }, []);

  return (
    <div className={s.form}>
      <input
        type="text"
        value={text}
        onChange={(e) => {
          setText(e.currentTarget.value);
        }}
        onKeyPress={(e) => {
          if (e.code === "Enter" && !!text) {
            sendMessageHandle(WS_MESSAGE_METHODS.MESSAGE);
          }
        }}
      />
    </div>
  );
});
