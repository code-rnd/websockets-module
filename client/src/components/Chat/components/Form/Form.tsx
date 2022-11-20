import { FC, memo } from "react";

import s from "./Form.module.scss";
import { WS_MESSAGE_METHODS } from "../../../../api/controllers";

interface FormProps {
  text: string;
  setText: any;
  onSubmit: (method: WS_MESSAGE_METHODS) => void;
}
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
