import { environment } from "../../constants";

export enum WS_STATUS_CONNECT {
  /** Сокет создан. Соединение еще не открыто */
  CONNECTING = "CONNECTING",
  /** Соединение открыто и готово к общению */
  OPEN = "OPEN",
  /** Соединение находится в процессе закрытия */
  CLOSING = "CLOSING",
  /** Соединение закрыто или не может быть открыто */
  CLOSED = "CLOSED",
}

export enum WS_MESSAGE_METHODS {
  MESSAGE = "MESSAGE",
  CONNECTION = "CONNECTION",
}

export const websocket = new WebSocket(
  environment.REACT_APP_WS_URL || "ws://localhost:5001"
);
