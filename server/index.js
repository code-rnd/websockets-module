const express = require("express");
const app = express();
const WSserver = require("express-ws")(app);

const PORT = process.env.PORT || 5001;

app.ws("/", (ws, req) => {
    console.log("Status - open",ws,req)
})

app.listen(PORT, () => {
    console.log("Status start / " + PORT)
})
