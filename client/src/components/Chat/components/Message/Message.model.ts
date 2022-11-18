import { MessageModel } from "../../../WsContainer";

export interface MessageProps {
  isHost: boolean;
  message: MessageModel;
}
