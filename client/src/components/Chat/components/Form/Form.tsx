import { FC, memo } from "react";

import s from "./Form.module.scss";

export const Form: FC<{
  text: string;
  setText: any;
  onSubmit: () => void;
}> = memo(({ text, setText, onSubmit }) => {
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
            onSubmit();
          }
        }}
      />
    </div>
  );
});
