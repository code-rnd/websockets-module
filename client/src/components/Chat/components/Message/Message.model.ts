import { MessageModel } from "../../Chat.model";

export interface MessageProps {
  isNewUser: boolean;
  isHost: boolean;
  message: MessageModel;
}
