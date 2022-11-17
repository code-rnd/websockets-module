import { environment } from "../constants";

export const wsController = {
  ws: new WebSocket(environment.REACT_APP_WS_URL || "ws://localhost:5001"),
};
