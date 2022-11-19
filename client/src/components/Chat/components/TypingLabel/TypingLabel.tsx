import { FC, memo } from "react";

import s from "./TypingLabel.module.scss";
import { TypingLabelProps } from "./TypingLabel.model";

export const TypingLabel: FC<TypingLabelProps> = memo(({ typingUser }) => {
  return (
    <div className={s.typingLabel}>
      {typingUser ? `${typingUser.user} печатает..` : ""}
    </div>
  );
});
