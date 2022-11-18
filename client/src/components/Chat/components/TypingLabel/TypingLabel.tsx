import { FC } from "react";

import s from "./TypingLabel.module.scss";
import { TypingLabelProps } from "./TypingLabel.model";

export const TypingLabel: FC<TypingLabelProps> = ({ typingUser }) => {
  return (
    <div className={s.typingLabel}>
      {typingUser ? `${typingUser.user} печатает..` : ""}
    </div>
  );
};
