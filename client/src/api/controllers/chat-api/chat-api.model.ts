import { WS_MESSAGE_METHODS } from "./chat-api.enum";

export interface WebSoketMessage {
  messageId: string;
  sessionId: string;
  method: WS_MESSAGE_METHODS;
  date: Date;
}

export interface SubscribeMessageArgs<T> {
  [WS_MESSAGE_METHODS.CONNECTION]?: (ev: T) => void;
  [WS_MESSAGE_METHODS.DISCONNECTION]?: (ev: T) => void;
  [WS_MESSAGE_METHODS.MESSAGE]?: (ev: T) => void;
  [WS_MESSAGE_METHODS.TYPING_START]?: (ev: T) => void;
  [WS_MESSAGE_METHODS.TYPING_END]?: (ev: T) => void;
  [WS_MESSAGE_METHODS.NONE]?: () => void;
}
