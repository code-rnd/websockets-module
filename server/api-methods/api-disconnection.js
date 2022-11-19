import { aWss } from "../index.js";
import { WS_MESSAGE_METHODS } from "../constants/index.js";

export const disconnectionHandler = (ws, msg) => {
  ws.id = msg.userId;
  broadcastDisconnection(ws, msg);
};
const broadcastDisconnection = (ws, msg) => {
  aWss.clients.forEach((client) => {
    const data = {
      userId: msg.userId,
      user: msg.user,
      messageId: msg.messageId,
      method: WS_MESSAGE_METHODS.DISCONNECTION,
      date: msg.date,
    };
    client.send(JSON.stringify(data));
  });
};
