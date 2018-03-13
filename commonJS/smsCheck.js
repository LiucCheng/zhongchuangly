/**
 *  短信验证码，参考网址：https://luosimao.com/docs/api/
 * */
var https = require('https');
var querystring = require('querystring');

function luosimaosms(option){
    this.protocol = 'https';
    this.url = 'sms-api.luosimao.com';
    this.path = '/v1/send.json';
    this.username = 'api';
    this.key = 'key-059e6014fc3a690ad5e7be2a6b60e231';
}

luosimaosms.prototype.sendMessage = function(mobile,code,callback){

    var postData = {
        mobile: mobile,
        message:'您的验证码是：' + code + '，【中创联营】'
    };

    var content = querystring.stringify(postData);

    var req = https.request({
        host:this.url,
        path:this.path,
        method:'POST',
        auth:  this.username + ':' + this.key,
        agent:false,
        rejectUnauthorized : false,
        headers:{
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Content-Length' : content.length
        }
    }, function(res){
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            callback(JSON.parse(chunk));
        });
    });

    req.write(content);
    req.end();

};

module.exports = luosimaosms;