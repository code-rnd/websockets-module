import { aWss } from "../index.js";
import { WS_MESSAGE_METHODS } from "../constants/index.js";

export const connectionHandler = (ws, msg) => {
  ws.id = msg.userId;
  broadcastConnection(ws, msg);
};
const broadcastConnection = (ws, msg) => {
  aWss.clients.forEach((client) => {
    const data = {
      userId: msg.userId,
      user: msg.user,
      messageId: msg.messageId,
      method: WS_MESSAGE_METHODS.CONNECTION,
      date: msg.date,
    };
    client.send(JSON.stringify(data));
  });
};
