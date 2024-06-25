const express = require("express");
const axios = require("axios");
const fetchdatarouter = require("./routers/fetchdatarouter");
const fetchstrikeprice = require("./routers/fetchStrikepriceRouter");
const cors = require("cors");
const app = express();

app.use(cors());
app.use("/api", fetchdatarouter);
app.use("/api", fetchstrikeprice);

module.exports = app;
