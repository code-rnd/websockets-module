import { FC, memo } from "react";

import s from "./Message.module.scss";

import { MessageProps } from "./Message.model";
import { cn } from "../../../../shared/utils";
import { dateTimeFormatOptions } from "../../../../shared";

export const Message: FC<MessageProps> = memo(
  ({ message, isHost, isNewUser }) => {
    const text = isHost ? (
      `${message.text}`
    ) : (
      <>
        <div className={s.hostName}>{message.user}</div>
        {message.text}
      </>
    );

    const dateTime = new Date(message.date).toLocaleTimeString(
      undefined,
      dateTimeFormatOptions
    );

    return (
      <div
        className={cn([
          s.message,
          isHost && s.isHost,
          isNewUser && s.isNewUser,
        ])}
      >
        <div className={s.content}>
          <div className={s.text}>
            {isNewUser ? `${message.user} joined the chat` : text}
          </div>
          <div className={s.time}>{dateTime}</div>
        </div>
      </div>
    );
  }
);
