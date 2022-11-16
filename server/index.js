/** Импорты */
const express = require("express");
const app = express();
const WSserver = require("express-ws")(app);
const aWss = WSserver.getWss();
const WS_MESSAGE_METHODS = require("./constants/websockets.const");

/** Константы */
const PORT = process.env.PORT || 5001;

app.ws("/", (ws, req) => {
  ws.on("message", (msg) => {
    msg = JSON.parse(msg);
    switch (msg.method) {
      case WS_MESSAGE_METHODS.CONNECTION:
        connectionHandler(ws, msg);
        break;

      case WS_MESSAGE_METHODS.MESSAGE:
        messageHandler(ws, msg);
        break;

      default:
        console.log("Default: ", msg.method);
        break;
    }
  });
});

app.listen(PORT, () => {
  console.log("Сервер стартовал, порт: " + PORT);
});

const connectionHandler = (ws, msg) => {
  console.log("connectionHandler: ", msg);
  ws.id = msg.id;
  broadcastConnection(ws, msg);
};
const broadcastConnection = (ws, msg) => {
  console.log("broadcastConnection: ", msg);

  aWss.clients.forEach((client) => {
    if (client.id === msg.id) {
      client.send(`Пользователь ${msg.userName} - подключился`);
    }
  });
};
const messageHandler = (ws, msg) => {
  console.log("messageHandler: ", msg);
};
