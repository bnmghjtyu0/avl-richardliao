var express = require("express");
var router = express.Router();
var signinRouter = require("./signin");
var signupRouter = require("./signup");
var googleAuthRouter = require("./googleAuth");

router.use("/", signinRouter);
router.use("/", signupRouter);
router.use("/", googleAuthRouter);

module.exports = router;
