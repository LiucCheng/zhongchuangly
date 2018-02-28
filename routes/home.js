/**
 * Created by Administrator on 2018/2/28.
 */
const express = require("express");
const route = express.Router();
const path = require("path");

route.post("/",function (req, res) {
    res.sendFile(path.join(__dirname, './webClient/index.html'));
}).get("/", function (req, res) {
    console.log(__dirname)
    res.sendFile(path.join(__dirname, '../webClient/index.html'));
});
module.exports = route;