import { aWss } from "../index.js";
import { WS_MESSAGE_METHODS } from "../constants/index.js";

export const messageHandler = (ws, msg) => {
  broadcastMessage(ws, msg);
};
const broadcastMessage = (ws, msg) => {
  aWss.clients.forEach((client) => {
    const data = {
      userId: msg.userId,
      user: msg.user,
      messageId: msg.messageId,
      method: WS_MESSAGE_METHODS.MESSAGE,
      date: msg.date,
      text: msg.text,
    };
    client.send(JSON.stringify(data));
  });
};
