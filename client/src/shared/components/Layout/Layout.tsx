import { FC, memo, ReactNode } from "react";
import s from "./Layout.module.scss";

export const Layout: FC<{ children: ReactNode }> = memo(({ children }) => {
  return <div className={s.container}>{children}</div>;
});
