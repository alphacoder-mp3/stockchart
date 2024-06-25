const express = require("express");
const routes = express.Router();
const fetchoptionsdata = require("../controller/getData");

routes.get("/option-strikePrice", fetchoptionsdata.getData);

module.exports = routes;
