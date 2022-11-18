import { FC } from "react";

import s from "./Message.module.scss";

import { MessageProps } from "./Message.model";
import { cn } from "../../../../shared/utils";
import { dateTimeFormatOptions } from "../../../../shared";

export const Message: FC<MessageProps> = ({ message, isHost }) => {
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
    <div className={cn([s.message, isHost && s.isHost])}>
      <div className={s.content}>
        <div className={s.text}>{text}</div>
        <div className={s.time}>{dateTime}</div>
      </div>
    </div>
  );
};
