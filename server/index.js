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
  console.log("Сокет на сервере открыт: " + PORT);
});

const connectionHandler = (ws, msg) => {
  console.log(WS_MESSAGE_METHODS.CONNECTION + ": ", msg);
  ws.id = msg.id;
  broadcastConnection(ws, msg);
};
const broadcastConnection = (ws, msg) => {
  aWss.clients.forEach((client) => {
    const data = {
      id: msg.id,
      user: msg.user,
      method: WS_MESSAGE_METHODS.CONNECTION,
    };
    client.send(JSON.stringify(data));
  });
};
const messageHandler = (ws, msg) => {
  console.log(WS_MESSAGE_METHODS.MESSAGE + ": ", msg);
  broadCastMessage(ws, msg);
};
const broadCastMessage = (ws, msg) => {
  aWss.clients.forEach((client) => {
    const data = {
      id: msg.id,
      user: msg.user,
      method: WS_MESSAGE_METHODS.MESSAGE,
      text: msg.text,
    };
    client.send(JSON.stringify(data));
  });
};
