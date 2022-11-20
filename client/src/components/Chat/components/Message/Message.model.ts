import { MessageModel } from "../../../WsContainer";

export interface MessageProps {
  isNewUser: boolean;
  isHost: boolean;
  message: MessageModel;
}
