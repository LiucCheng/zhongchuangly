/**
 * Created by Administrator on 2017/12/5.
 */
const express = require("express");
const route = express.Router();
const login = require("../../mysqlDB/userInfo/register.js");

route.post("/",function (req, res) {
    login.checkLogin(req.body, function (msg) {
        if (msg.errCode === 0 || msg.isSuccess === 1){
            var token = new Date().getTime();
            req.cookies.set("userInfo", JSON.stringify({
                uid: msg.data.uid,
                token: token,
                phone: msg.data.phone
            }));
            delete msg.data;
        }
        res.send(msg);
    })
});
module.exports = route;