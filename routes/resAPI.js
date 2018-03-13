var path = require("path");


// 路由相关
module.exports = function (app) {
    // 首页
    app.use("/", require("./home.js"));

    // 登录注册相关
    app.use("/register", require("./login/register.js"));   // 注册
    app.use("/login", require("./login/login.js"));         // 登录验证
    app.use("/logout", require("./login/logout.js"));       // 登出

    // 产品


    // 活动专题

}