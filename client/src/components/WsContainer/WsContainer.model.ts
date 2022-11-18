import { WS_MESSAGE_METHODS } from "../../shared";

export interface MessageModel {
  id: string;
  user: string;
  method: WS_MESSAGE_METHODS;
  date: Date;
  text?: string;
}
