const http = require("http");
const https = require("https");
const express = require("express");
const url = require("url");
const path = require("path");
const fs = require("fs");
const logger = require('morgan'); // 可以将请求信息打印在控制台，便于开发调试
const favicon = require("serve-favicon");
const methodOverride = require("method-override");
const Cookies = require("cookies");
const checkData = require("./mysqlDB/mysqlAPI.js");

// 解析body的参数，form表单提交等 上传
const multiparty = require("connect-multiparty");
const multipartyMiddleware = multiparty();

const querystring = require('querystring');
const app = express();

// post 请求用到
const bodyParser = require("body-parser");

// 数据库
const mysql = require("mysql");

const httpServer = http.createServer(app);
const httpPORT = 8888;

// remove value in array
Array.prototype.removeItem = function(val) {
    for(var i = 0;i < this.length;i++) {
        if(this[i] == val) {
            this.splice(i, 1);
            break;
        }
    }
}

// express 基本配置
// app.use(logger('dev'));  // app.use(logger('combined', {stream : accessLog})); // 打印到日志中

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// 设置cookies
app.use(function (req, res, next) {
    req.cookies = new Cookies(req, res);
    req.userInfo = {};
    if (req.cookies.get("userInfo")){
        // 用户已经登录的情况
        // 再次验证用户信息
       /* try {
            req.userInfo = JSON.parse(req.cookies.get("userInfo"));
            checkData.checkData(req.userInfo,function (data) {
                if(data.isExist === 1){
                    // 验证登录状态通过执行的代码

                } else {
                    // 验证不通过

                }
                next();
            });
        }catch (e){next();}*/

    } else {
        // 没有登录的情况
        next();
    }
})


app.use(methodOverride(function (req, res) {
    if (req.body && typeof  req.body === 'object' && '_method' in req.body){
        // look in url encoded Post bodies and delete it
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

// 静态文件
app.use(express.static(path.join(__dirname, './webClient')));
// require("./routes/resAPI.js");
app.use("/login", require("./routes/login/login.js"));
app.use("/logout", require("./routes/login/logout.js"));


// app.get("/", function (req, res, next) {
//     // res.sendFile(path.join(__dirname, './webClient/test.html'));
// });
// 数据库链接成功

httpServer.listen(httpPORT, function () {
    console.log("已监听",httpPORT);
});
