const { aWss } = require("../app");
const { WS_MESSAGE_METHODS } = require("../constants/websockets.const");

const connectionHandler = (ws, msg) => {
  ws.id = msg.id;
  broadcastConnection(ws, msg);
};
const broadcastConnection = (ws, msg) => {
  aWss.clients.forEach((client) => {
    const data = {
      id: msg.id,
      user: msg.user,
      method: WS_MESSAGE_METHODS.CONNECTION,
      date: msg.date,
    };
    client.send(JSON.stringify(data));
  });
};

module.exports = { connectionHandler };
