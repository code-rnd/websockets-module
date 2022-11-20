import { FC, memo } from "react";
import { useQuery } from "react-query";

import { MessageModel } from "../../Chat.model";

import s from "./TypingLabel.module.scss";

const getTypingUser = (e: any) => {
  return e.meta;
};

export const TypingLabel: FC = memo(() => {
  const typingUserQuery = useQuery("pack/TypingUser", getTypingUser);
  const typingUser = typingUserQuery?.data as MessageModel;

  return (
    <div className={s.typingLabel}>
      {typingUser ? `${typingUser.user} печатает..` : ""}
    </div>
  );
});
