import { FC } from "react";

import { Message } from "./components";
import { ChatProps } from "./Chat.model";

import s from "./Chat.module.scss";

export const Chat: FC<ChatProps> = ({ userId, messages }) => {
  return (
    <div className={s.chat}>
      {messages.map((message) => {
        const isHost = message.id === userId;

        return <Message isHost={isHost} message={message} key={message.id} />;
      })}
    </div>
  );
};
