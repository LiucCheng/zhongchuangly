/**
 * Created by Administrator on 2018/1/26.
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
                console.log(qerr, vals, field);
                //事件驱动回调
                callback(qerr,vals,field);
            })
        }
    })
}
module.exports = query;