import { MessageModel } from "../WsContainer";

export interface ChatProps {
  userId: string;
  messages: MessageModel[];
}
