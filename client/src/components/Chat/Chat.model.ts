import { WS_MESSAGE_METHODS } from "../../api";

export interface ChatProps {
  userId: string;
  messages: MessageModel[];
}

export interface MessageModel {
  userId: string;
  user: string;
  messageId: string;
  method: WS_MESSAGE_METHODS;
  date: Date;
  text?: string;
  color: string;
}
