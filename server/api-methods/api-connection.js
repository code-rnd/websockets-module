import { aWss } from "../index.js";
import { WS_MESSAGE_METHODS } from "../constants/index.js";

export const connectionHandler = (ws, msg) => {
  ws.id = msg.userId;
  broadcastConnection(ws, msg);
};
const broadcastConnection = (ws, msg) => {
  aWss.clients.forEach((client) => {
    if (client.id !== msg.userId) {
      const data = {
        sessionId: msg.sessionId,
        messageId: msg.messageId,
        method: WS_MESSAGE_METHODS.CONNECTION,
        date: msg.date,

        userId: msg.userId,
        user: msg.user,
      };
      client.send(JSON.stringify(data));
    }
  });
};
