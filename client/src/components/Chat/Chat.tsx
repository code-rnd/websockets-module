import { FC, memo } from "react";

import { Message } from "./components";

import { WS_MESSAGE_METHODS } from "../../api";
import { MessageModel } from "./Chat.model";

import s from "./Chat.module.scss";

export const Chat: FC<{ messages: MessageModel[]; userId: string }> = memo(
  ({ messages, userId }) => {
    return (
      <div className={s.chat}>
        {messages.map((message, key) => (
          <Message
            isNewUser={message.method === WS_MESSAGE_METHODS.CONNECTION}
            isHost={message.userId === userId}
            message={message}
            key={key}
          />
        ))}
      </div>
    );
  }
);
