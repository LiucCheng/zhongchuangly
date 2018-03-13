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
const session = require("express-session");
const MySQLStore = require('express-mysql-session')(session); // session的mysql存储模块
const cookieParser = require("cookie-parser");

const commonJS = require("./commonJS/commonJS.js");

// 解析body的参数，form表单提交等 上传
const multiparty = require("connect-multiparty");
const multipartyMiddleware = multiparty();

const querystring = require('querystring');
const app = express();

// post 请求用到
const bodyParser = require("body-parser");

var routes = require("./routes/resAPI.js");

// 数据库
const mysql = require("mysql");
const checkMysql = require("./mysqlDB/userInfo/register.js");

const httpServer = http.createServer(app);
const httpsServer = https.createServer(app);
const httpPORT = 8888;
const httpsPORT = 8887;


// app.use("/", sms.send(req, res));

var options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '.lc123456',
    database: 'user_info',
    /*schema: {   // 用来自定义表格
        tableName: 'uuu',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }*/
};
/*var sessionStore = new MySQLStore(options);

app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));*/

// express 基本配置
// app.use(logger('dev'));  // app.use(logger('combined', {stream : accessLog})); // 打印到日志中

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

/*// 设置cookies
app.use(function (req, res, next) {
    req.cookies = new Cookies(req, res);
    req.userInfo = {};
    if (req.cookies.get("userInfo")){
        // 用户已经登录的情况
        // 再次验证用户信息
       try {
            req.userInfo = JSON.parse(req.cookies.get("userInfo"));
           checkMysql.onlyFind(["uid",req.userInfo.uid],function (msg) {
               // console.log(msg);
               if (msg.isLogin === 1){
                   // res.send();
                   // 已经是登录状态
                   next();
               } else {
                   // 登录状态的身份有问题
                   next();
               }
           });
           // console.log(req.userInfo);
           // checkMysql
        }catch (e){next();}

    } else {
        // 没有登录的情况
        next();
    }
})*/
app.use(cookieParser());

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

// 路由配置
routes(app);


// 短信验证
/*var luosimaosms = require('./commonJS/smsCheck.js');
var client = new luosimaosms();
client.sendMessage('13530000312','1234',function(data){
    console.log(data);
});*/


httpServer.listen(httpPORT, function () {
    console.log("已监听",httpPORT);
});
httpsServer.listen(httpsPORT, function () {
    console.log("已监听",httpsPORT);
});
