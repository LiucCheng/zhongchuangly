/**
 * Created by Administrator on 2017/12/5.
 */
var mysql = require("mysql");

var response = {
    code: 1, // 链接成功
    errmsg: ""
}
const parameter = {
    host: "localhost",
    user: "root",
    password: ".lc123456",
    multipleStatements: true // 该参数表示支持多个mysql语句输入；
}
var connection = null;
function connect() {
    connection = mysql.createConnection(parameter);
}
connect();
connection.connect(function (err) {
    if (err){
        // 如果是连接断开，自动重新连接
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            connect();
        } else {
            console.error(err.stack || err);
        }
        return;
    }
    console.log("数据库连接成功");
});

function querr(msg, oncall) {
    connection.query(msg, function (err, rows) {
        if (err){
            response.code = 0;
            response.errmsg = "查找数据库的时候出现了问题";
            oncall(response);
            return;
        }
        oncall(rows);
    });
}
// 执行查询语句
function checkData(parems,oncall) {
    var userName = parems.userName;
    var password = parems.password;

    var checkKey = parems.checkKey;

    var databaseName = parems.database || "user_info";


    var database = "USE " + databaseName + ";";
    var checkSql = database + "SELECT * FROM userinfo WHERE name='" + userName + "'";
    querr(checkSql,function (rows) {
        console.log(rows,"----")
        if (rows[1].length === 0){
            // 有表格，但是没有找到
            response.isExist = 0;
            response.msg = "该用户还未注册";
        } else {
            response.userInfo = {};
            // 已经存在当前查找的数据库在数据中：
            if (password === rows[1][0].pwd){
                response.isExist = 1;
                response.msg = "用户名和密码正确";
                response.userInfo.userName = rows[1][0].name;
                response.userInfo.id = rows[1][0].id;
            } else {
                response.isExist = 2;
                response.msg = "用户名或密码错误";
            }
        }
        oncall(response);
    });
}

module.exports.checkData = checkData;