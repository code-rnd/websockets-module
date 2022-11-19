import { FC, memo } from "react";

import { Message } from "./components";
import { ChatProps } from "./Chat.model";

import s from "./Chat.module.scss";

export const Chat: FC<ChatProps> = memo(({ userId, messages }) => {
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
});
