const { aWss } = require("../app");
const { WS_MESSAGE_METHODS } = require("../constants/websockets.const");

const typingStartHandler = (ws, msg) => {
  broadcastTypingStart(ws, msg);
};

const broadcastTypingStart = (ws, msg) => {
  aWss.clients.forEach((client) => {
    if (client.id !== msg.id) {
      const data = {
        id: msg.id,
        user: msg.user,
        method: WS_MESSAGE_METHODS.TYPING_START,
        date: msg.date,
        text: msg.text,
      };
      client.send(JSON.stringify(data));
    }
  });
};

const typingEndHandler = (ws, msg) => {
  broadcastTypingEnd(ws, msg);
};

const broadcastTypingEnd = (ws, msg) => {
  aWss.clients.forEach((client) => {
    if (client.id !== msg.id) {
      const data = {
        id: msg.id,
        user: msg.user,
        method: WS_MESSAGE_METHODS.TYPING_END,
        date: msg.date,
        text: msg.text,
      };
      client.send(JSON.stringify(data));
    }
  });
};

module.exports = { typingStartHandler, typingEndHandler };
