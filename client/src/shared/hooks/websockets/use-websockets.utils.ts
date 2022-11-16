import { WS_STATUS_CONNECT } from "./use-websockets.const";

export const checkConnectStatus = (status: WS_STATUS_CONNECT): boolean => {
  return status === WS_STATUS_CONNECT.CONNECTING;
};
export const checkOpenStatus = (status: WS_STATUS_CONNECT): boolean => {
  return status === WS_STATUS_CONNECT.OPEN;
};
