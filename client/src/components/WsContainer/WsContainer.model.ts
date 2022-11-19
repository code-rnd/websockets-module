import { WS_MESSAGE_METHODS } from "../../shared";

export interface MessageModel {
  userId: string;
  user: string;
  messageId: string;
  method: WS_MESSAGE_METHODS;
  date: Date;
  text?: string;
}
