/**
 * Created by Administrator on 2018/2/27.
 */
const registerMysql = require("../../mysqlDB/userInfo/register.js");
const express = require("express");
const route = express.Router();

// registerMysql.find(data);
route.post("/",function (req, res) {
    console.log(req.body);
    registerMysql.find(req.body,function (msg) {
        res.send(msg);
    });
});
module.exports = route;