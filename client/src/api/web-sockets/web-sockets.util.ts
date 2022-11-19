import { WS_STATUS_CONNECT } from "./web-sockets.enum";

export const getSocketStatus = (status: number): WS_STATUS_CONNECT => {
  switch (status) {
    case 0:
      return WS_STATUS_CONNECT.CONNECTING;
    case 1:
      return WS_STATUS_CONNECT.OPEN;
    case 2:
      return WS_STATUS_CONNECT.CLOSING;
    case 3:
      return WS_STATUS_CONNECT.CLOSED;

    default:
      return WS_STATUS_CONNECT.CLOSED;
  }
};
