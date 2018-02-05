/**
 * Created by Administrator on 2017/12/5.
 */
$(function () {
    function getCookie(name) {
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    }
    function setCookie(name,value,time)
    {
        var Days = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days*24*60*60*1000);
        document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
    }

    var userInfo = getCookie("userInfo");
    console.log(userInfo,"-----------");
    $("#submit1").on("click", function () {
        var userName = $("#userName").val();
        var password = $("#password").val();
        var self = this;
        var data = {}
        if (userName === "") {
            alert("请输入用户名！");
            return
        }
        if (password === ""){
            alert("请输入密码！")
            return;
        }
        data.userName = userName;
        data.password = password;
        $.ajax({
            url: "/login",
            dataType: "json",
            type: "POST",
            data: data,
            success: function (msg) {
                if (msg.code === 1 && msg.errmsg === ""){
                    $(self).parent("div").replaceWith("<div>登录成功</div>")
                }
                console.log(msg);
            }
        })
    });



})