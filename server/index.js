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

      case WS_MESSAGE_METHODS.TYPING_START:
        typingStartHandler(ws, msg);
        break;

      case WS_MESSAGE_METHODS.TYPING_END:
        typingEndHandler(ws, msg);
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
  ws.id = msg.id;
  bcConnection(ws, msg);
};
const bcConnection = (ws, msg) => {
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
const messageHandler = (ws, msg) => {
  broadCastMessage(ws, msg);
};
const broadCastMessage = (ws, msg) => {
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

const typingStartHandler = (ws, msg) => {
  bcTypingStart(ws, msg);
};

const bcTypingStart = (ws, msg) => {
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
  bcTypingEnd(ws, msg);
};

const bcTypingEnd = (ws, msg) => {
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
