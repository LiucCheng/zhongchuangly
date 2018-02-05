/**
 * Created by Administrator on 2017/12/9.
 * 用户登录信息模块
 */
/*
字符串类型     字节大小         描述及存储需求
CHAR         0-255字节          定长字符串
VARCHAR      0-255字节          变长字符串
TINYBLOB     0-255字节        不超过 255 个字符的二进制字符串
TINYTEXT     0-255字节        短文本字符串
BLOB         0-65535字节      二进制形式的长文本数据
TEXT         0-65535字节      长文本数据
MEDIUMBLOB   0-16 777 215字节 二进制形式的中等长度文本数据
MEDIUMTEXT   0-16 777 215字节 中等长度文本数据
LOGNGBLOB    0-4 294 967 295字节 二进制形式的极大文本数据
LONGTEXT     0-4 294 967 295字节 极大文本数据
VARBINARY(M)                   允许长度0-M个字节的定长字节符串，值的长度+1个字节
BINARY(M)    M                 允许长度0-M个字节的定长字节符串
*/
// var mysqlConnect = require("../mysqlApi2");
var mysql = require("mysql");
var pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: ".lc123456"
})

var checkDatabaseExist = "SELECT * FROM information_schema.SCHEMATA where SCHEMA_NAME='aa'"; // 检查数据库是否存在

var checkTableExist = "SELECT DISTINCT t.table_name, n.SCHEMA_NAME FROM information_schema.TABLES t, "
    + "information_schema.SCHEMATA n WHERE t.table_name = 'userinfo' AND n.SCHEMA_NAME = 'user_info';";// 检查数据库表是否存在

var createSql =
    "CREATE TABLE IF NOT EXISTS `userinfo1` ("
    + "`id` int(10) unsigned NOT NULL AUTO_INCREMENT,"
    + "`name` varchar(30) DEFAULT NULL,"
    + "`pwd` varchar(30) DEFAULT NULL,"
    + "`country` int(10) DEFAULT NULL COMMENT '国家外键',"
    + "PRIMARY KEY (`id`),"
    + "KEY `fk_Country` (`country`),"
    + "CONSTRAINT `fk_Country` FOREIGN KEY (`country`) REFERENCES `countrytable` (`country`) ON DELETE CASCADE ON UPDATE CASCADE"
    + ") ENGINE=InnoDB AUTO_INCREMENT=15566 DEFAULT CHARSET=utf8;"; // 创建带有外键的表格

var update = "INSERT INTO `userinfo` VALUES ('11111', 'nie的', 'dsfasdf', '1')";  // 插入数据

pool.getConnection(function (err, connection) {
    function isExits() {
        connection.query(checkTableExist, function (err, rows, field) {
            if (err) {
                // 数据库语法有问题
                console.error(err);
                return;
            }
            if (rows.length){
                // createTable();
                insertValue(update);
            } else {

            }
            console.log(rows,rows.length);
            connection.release();
        });
    }
})
function createTable() {
    connection.query(createSql, function (err, rows, field) {
        if (err) {
            // 数据库语法有问题
            console.error(err);
            return;
        }
        console.log(rows,rows.length);
    });
}

function insertValue(update) {
    connection.query(update, function (err, rows, field) {
        if (err) {
            // 数据库语法有问题
            console.error(err);
            return;
        }
        console.log(rows,rows.length,"===========")
    });
}
isExits();
// module.exports = userInfo;