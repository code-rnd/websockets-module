const { aWss } = require("../app");
const { WS_MESSAGE_METHODS } = require("../constants/websockets.const");

const messageHandler = (ws, msg) => {
  broadcastMessage(ws, msg);
};
const broadcastMessage = (ws, msg) => {
  aWss.clients.forEach((client) => {
    const data = {
      id: msg.id,
      user: msg.user,
      method: WS_MESSAGE_METHODS.MESSAGE,
      date: msg.date,
      text: msg.text,
    };
    client.send(JSON.stringify(data));
  });
};

module.exports = { messageHandler };
