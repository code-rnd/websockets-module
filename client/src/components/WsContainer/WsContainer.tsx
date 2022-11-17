import {
  CSSProperties,
  FC,
  useCallback,
  useLayoutEffect,
  useState,
} from "react";

import { useWebsockets, WS_MESSAGE_METHODS } from "../../shared";

import s from "./WsContainer.module.scss";
import { MessageModel } from "./WsContainer.model";
import { rndHash } from "./WsContainer.const";

export const WsContainer: FC = () => {
  const { messages, onopen, send } = useWebsockets();
  const [text, setText] = useState("");
  const [name, setName] = useState("");

  const id = rndHash;

  onopen({
    id,
    user: name,
    method: WS_MESSAGE_METHODS.CONNECTION,
  });

  const onSubmit = useCallback(() => {
    const message: MessageModel = {
      id,
      user: name,
      method: WS_MESSAGE_METHODS.MESSAGE,
      text,
    };

    send(message);
    setText("");
  }, [text, name]);

  useLayoutEffect(() => {
    const userName = window.prompt("Your name?");
    setName(userName || rndHash);
  }, []);

  return (
    <div className={s.container}>
      <div className={s.list}>
        {messages.map((item, key) => {
          const isHost = item.id === id;
          const title = isHost ? `${item.text}` : `${item.user}: ${item.text}`;
          const style: CSSProperties = isHost ? { textAlign: "right" } : {};

          return (
            <div className={s.item} style={style} key={key}>
              {title}
            </div>
          );
        })}
      </div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.currentTarget.value)}
        onKeyPress={(e) => {
          if (e.code === "Enter" && !!text) {
            onSubmit();
          }
        }}
      />
    </div>
  );
};
