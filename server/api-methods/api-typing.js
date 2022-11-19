import { aWss } from "../index.js";
import { WS_MESSAGE_METHODS } from "../constants/index.js";

export const typingStartHandler = (ws, msg) => {
  broadcastTypingStart(ws, msg);
};

const broadcastTypingStart = (ws, msg) => {
  aWss.clients.forEach((client) => {
    // if (client.id !== msg.userId) {
    const data = {
      userId: msg.userId,
      user: msg.user,
      method: WS_MESSAGE_METHODS.TYPING_START,
      date: msg.date,
      text: msg.text,
    };
    client.send(JSON.stringify(data));
    // }
  });
};

export const typingEndHandler = (ws, msg) => {
  broadcastTypingEnd(ws, msg);
};

const broadcastTypingEnd = (ws, msg) => {
  aWss.clients.forEach((client) => {
    // if (client.id !== msg.userId) {
    const data = {
      userId: msg.userId,
      user: msg.user,
      messageId: msg.messageId,
      method: WS_MESSAGE_METHODS.TYPING_END,
      date: msg.date,
      text: msg.text,
    };
    client.send(JSON.stringify(data));
    // }
  });
};
