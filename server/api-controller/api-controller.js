const { WS_MESSAGE_METHODS } = require("../constants/websockets.const");

const { app } = require("../app");
const { PORT } = require("../constants/port.const");

const {
  connectionHandler,
  messageHandler,
  typingStartHandler,
  typingEndHandler,
} = require("../api-methods");

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
