/**
 * Created by Administrator on 2017/12/6.
 */
const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
    req.clearCookie("userInfo");
    res.json({
        code: 1,
        errmsg: "",
        msg: "登出成功"
    });
});
module.exports = router;