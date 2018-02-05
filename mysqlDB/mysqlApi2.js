/**
 * Created by Administrator on 2017/12/7.
 */
var mysql = require("mysql");

// var model = require("./model/userInfo.js");


/**
 * 一、内连接：只能查询到主表与外键有关系的数据
 * 查询外键：select e.name,d.name from employee e inner join department d on e.dept_id=d.id;
 * 等价于：select e.name,d.name from employee e,department d where e.dept_id=d.id;
 *
 * 二、外链接：
 * 1、左外链接：左表列出全部（主表），右表只列出匹配的记录
 * select * from userinfo e left join countrytable c on e.country=c.country;
 *
 * 2、右外连接：右表列出全部（副表），左表只列出匹配的记录。
 * select * from userinfo e right join countrytable c on e.country=c.country;
 *
 * 三、交叉链接：
 * select e.name,c.name from userinfo e , countrytable c;
 *
 * 四、自连接：参与连接的表都是同一张表。(通过给表取别名虚拟出两张表)（非常重要），其实就是左外链接
 * select e.name,c.`name` from userinfo e LEFT JOIN countrytable c ON e.name=c.name;
 * */

var parameter = {
        host: "localhost",
        user: "root",
        password: ".lc123456",
        database: "user_info"
    },
    mysqlResponse = {
        code: 0,
        errmsg: "",
        msg: ""
    }
var connection = mysql.createConnection(parameter);

function connectionMYSQL() {
    connection.connect(function (err) {
        if (err){
            console.error("数据库链接出错：" + err.stack);
            return;
        }
    });
}
function result(data) {
    if (data.length > 0){
        return data[0]
    } else {
        return null;
    }
}


function creatDatabase () {
    var GetSql =
        "CREATE DATABASE IF NOT EXISTS " + model.dataBase + " CHARACTER SET UTF8;";
    connection.query(GetSql, function (err, rows, field) {
        if (err) {
            // 数据库语法有问题
            console.error(err);
            return;
        }
    });
}

// 创建数据库中的表格
function createTable (oncall,params) {
    var database = params.database;
    var tableName = params.tableName;
    var headerTitleV = params.headerTitleV || "";

    var objKey = headerTitleV.split(",");
    var list = "";
    for (var i = 0;i < objKey.length;i++){
        if (objKey[i] === "id"){
            list += objKey[i] + " INT UNSIGNED NOT NULL AUTO_INCREMENT,";
        } else {
            list += objKey[i] + " varchar(30) NOT NULL,";
        }
    }
    var createSql = "CREATE TABLE IF NOT EXISTS" + tableName + "(" + list + "PRIMARY KEY (" + objKey[0] + "));";
    connection.query(createSql,function (err, rows, field) {
        if (err) {
            oncall({result : "error: 创建数据表单的时候的过程出现了问题！",err : err});
            return err;
        }
        // 创建数据库表单成功：
        oncall({result: "", isExist : 1});
    });
}

// 添加内容
function add() {
    connectionMYSQL();
    var t = {
        id:15565,
        name: "煤业",
        pwd: 9090909
    }
    connection.query("INSERT INTO userinfo SET ?", t, function (err, rows,fields) {
        if (err){
            throw err;
            return;
        }
        console.log(rows)
    })
    connection.end();
}

// 修改内容
function update() {
    connectionMYSQL();
    // connection.query("UPDATE userinfo SET name = :name",{name: "Hello Update MySQL"});
    connection.query("UPDATE userinfo SET name = ? where id = ?", ["update",1],function (err, rows) {
        if (err){
            throw err;
            return;
        }
        console.log(rows)
    });
    connection.end();
}

// 添加字段
function addColumn() {
    connectionMYSQL();
    var t = {
        a: 44148112222525225
    }
    // ALTER TABLE <表名> ADD <新字段> <类型>
    /**
     * ALTER TABLE `user_info`.`userinfo`
     * ADD COLUMN `aaa` INT(5) NULL DEFAULT 1 AFTER `age`;
    */
    connection.query("ALTER TABLE userinfo ADD a CHAR(18)",t, function (err, rows,fields) {
        if (err){
            throw err;
            return;
        }
        console.log(rows)
    })
    connection.end();
}

// 删除字段
function deleteColumn() {
    // ALTER TABLE <表名> DROP <字段>
    connectionMYSQL();
    connection.query("ALTER TABLE userinfo DROP cerID", function (err, rows,fields) {
        if (err){
            throw err;
            return;
        }
        console.log(rows)
    })
    connection.end();

}

function find() {
    connectionMYSQL();
    var sql = "SELECT * FROM ?? WHERE ?? = ?";
    var inserts = ['userinfo', 'id',2];
    sql = mysql.format(sql, inserts); // SELECT * FROM `userinfo` WHERE `id` = 1
    console.log(sql)
    connection.query(sql, function (err, rows,fields) {
        if (err){
            throw err;
            return;
        }
        console.log(rows);
        result(rows)
    })
    connection.end();

}
// var sorter = 'date';
// var sql    = 'SELECT * FROM posts ORDER BY ' + connection.escapeId('posts.' + sorter);

module.exports.connection = connection;