import { FC, memo } from "react";

import { WS_MESSAGE_METHODS } from "../../../../api";
import { FormProps } from "./Form.model";
import s from "./Form.module.scss";

export const Form: FC<FormProps> = memo(({ text, setText, onSubmit }) => {
  return (
    <div className={s.form}>
      <input
        type="text"
        value={text}
        onChange={(e) => {
          setText(e.currentTarget.value);
        }}
        onKeyPress={(e) => {
          if (e.code === "Enter" && !!text) {
            onSubmit(WS_MESSAGE_METHODS.MESSAGE);
          }
        }}
      />
    </div>
  );
});
