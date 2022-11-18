const express = require("express");
const app = express();

const WSserver = require("express-ws")(app);
const aWss = WSserver.getWss();

module.exports = { app, WSserver, aWss };
