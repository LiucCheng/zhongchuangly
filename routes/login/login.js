/**
 * Created by Administrator on 2017/12/5.
 */
const express = require("express");
const route = express.Router();
const checkData = require("../../mysqlDB/mysqlAPI.js");

var response = {
    code: 0, // 0 代表登录失败
    errmsg: "" // 错误信息
}

route.post("/",function (req, res) {
   checkData.checkData(req.body,function (data) {
       if(data.isExist === 1){
           response.code = 1;
           // 验证通过了 设置cookies
           req.cookies.set("userInfo", JSON.stringify({
               id: data.userInfo.id,
               userName: data.userInfo.userName
           }))
       } else {
           response.code = 2;
       }
       res.json(response);
   });
});
module.exports = route;