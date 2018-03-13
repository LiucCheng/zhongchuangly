/**
 * Created by Administrator on 2018/2/27.
 * 登录注册相关  数据库查询
 */

var query = require("./userInfo.js");
var mysql = require("mysql");
var tools = require("../../commonJS/commonJS.js");
var res = {
    errCode: 0,
    errMsg: "",
    isExist: 0,
    isSuccess: 0
};
var loginRes = {
    errCode: 0,
    errMsg: "",
    isSuccess: 0
}
function onlyFind(checkData,oncall) {
    var checkLogin = {
        errCode: 0,
        errMsg: "",
        isLogin: 0
    }
    var sql = "SELECT * FROM ?? WHERE ?? = ?";
    var inserts = ['userinfo', checkData[0],checkData[1]];
    sql = mysql.format(sql, inserts); // SELECT * FROM `userinfo` WHERE `id` = 1
    query(sql, function (err, rows,fields) {
        if (err){
            loginRes.errCode = 10000;
            loginRes.errMsg = "数据库查找出错";
            loginRes.isLogin = 0;
            oncall(checkLogin);
            throw err;
            return;
        }
        if (!rows.length){
            checkLogin.isLogin = 0;
        } else {
            checkLogin.isLogin = 1;
        }
        oncall(checkLogin);
    });
}
function find(data,oncall) {
    var sql = "SELECT * FROM ?? WHERE ?? = ?";
    var inserts = ['userinfo', 'phone',data.phone];
    sql = mysql.format(sql, inserts); // SELECT * FROM `userinfo` WHERE `id` = 1
    query(sql, function (err, rows,fields) {
        if (err){
            throw err;
            return;
        }
        if (!rows.length){
            // 不存在
            resultFind(data,res,oncall)
        } else {
            // 存在
            res.isExist = 1;
            resultFind(data,res,oncall)
        }
    });
}
function resultFind(data,msg,oncall) {
    if (!msg.isExist) {
        var date = new Date();
        var uid = tools.dateFormat(date,"yyyyMMddhhmmss") + Math.random().toString().substr(2, 6);
        var registerTime = tools.dateFormat(date,"yyyy-MM-dd hh:mm:ss");
        var sex = data.sex || "2";
        var update = "INSERT INTO `userinfo` VALUES ('" + uid + "', '" + data.name + "', '" + data.pwd + "','" + sex + "' ,'" + registerTime + "','0', '0', '0', '" + data.phone + "','' )";  // 插入数据
        query(update, function (err, vals, fields) {
            if (err) {
                res.errCode = 1000;
                res.errMsg = "数据库更新出错！";
                console.error("-----", err);
            } else {
                res.isSuccess = 1;
            }
            oncall(res);
        });

    } else {
        res.isExist = 1;
        res.isSuccess = 0;
        oncall(res);
    }
}


function checkLogin(data,oncall) {
    var sql = "SELECT * FROM ?? WHERE ?? = ?";
    var inserts = ['userinfo', 'phone',data.phone];
    sql = mysql.format(sql, inserts); // SELECT * FROM `userinfo` WHERE `id` = 1
    query(sql, function (err, rows,fields) {
        if (err){
            loginRes.errCode = 10000;
            loginRes.errMsg = "数据库查找出错";
            loginRes.isSuccess = 0;
            oncall(loginRes);
            throw err;
            return;
        }
        if (!rows.length){
            // 不存在
            loginRes.errCode = 10001;
            loginRes.errMsg = "该账号还未注册";
            loginRes.isSuccess = 0;
        } else {
            // 存在
            if (data.pwd === rows[0].pwd){
                loginRes.errCode = 0;
                loginRes.errMsg = "";
                loginRes.isSuccess = 1;
                loginRes.data = rows[0];
            } else {
                loginRes.errCode = 10002;
                loginRes.errMsg = "账号或密码错误";
                loginRes.isSuccess = 0;
            }
        }
        oncall(loginRes);
    });
}

// 查找是否已经注册了
module.exports.find = find;
module.exports.onlyFind = onlyFind;
module.exports.checkLogin = checkLogin;
