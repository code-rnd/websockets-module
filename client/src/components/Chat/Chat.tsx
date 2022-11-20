import { FC, memo } from "react";

import { Message } from "./components";

import { MessageModel } from "../WsContainer";

import s from "./Chat.module.scss";

export const Chat: FC<{ messages: MessageModel[]; userId: string }> = memo(
  ({ messages, userId }) => {
    return (
      <div className={s.chat}>
        {messages.map((message) => (
          <Message
            isHost={message.userId === userId}
            message={message}
            key={message.messageId}
          />
        ))}
      </div>
    );
  }
);
