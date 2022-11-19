import express from "express";
import expressWS from "express-ws";

export const app = express();
export const WSserver = expressWS(app);
export const aWss = WSserver.getWss();

import {
  connectionHandler,
  disconnectionHandler,
  messageHandler,
  typingEndHandler,
  typingStartHandler,
} from "./api-methods/index.js";
import { PORT, WS_MESSAGE_METHODS } from "./constants/index.js";

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

      case WS_MESSAGE_METHODS.DISCONNECTION:
        disconnectionHandler(ws, msg);
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
