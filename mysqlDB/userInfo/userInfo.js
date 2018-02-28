/**
 * Created by Administrator on 2018/2/27.
 * 链接数据库中用户信息的表格
 */
var mysql = require("mysql");
var pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: ".lc123456",
    database: "user_info"
});
var query = function (sql, callback) {
    pool.getConnection(function (err,conn) {
        if (err){
            callback(err, null, null);
        } else {
            conn.query(sql, function (qerr, vals, field) {
                //释放连接
                conn.release();
                //事件驱动回调
                callback(qerr,vals,field);
            })
        }
    })
}
module.exports = query;