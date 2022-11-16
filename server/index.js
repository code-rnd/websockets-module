const express = require("express");
const app = express();
const WSserver = require("express-ws")(app);

const PORT = process.env.PORT || 5001;

app.ws("/", (ws, req) => {
  console.log("Подключение установлено (сервер)");

  ws.send("Ты успешно подключился (от сервера)");
  ws.on("message", (message) => {
    const dataParse = JSON.parse(message);
    console.log({ dataParse });
  });
});

app.listen(PORT, () => {
  console.log("Сервер стартовал, порт: " + PORT);
});
