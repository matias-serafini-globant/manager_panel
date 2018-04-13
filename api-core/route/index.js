/*
*routes require files
*
*/
"use strict";
var express = require('express');
var router = express.Router();


var routerToken = require('../module/token/router');
var routerUser = require('../module/user/router');
var routerLogin = require('../module/login/router');

var routerConfig = require('../module/config/router');


router.use("/token", routerToken);
router.use("/user", routerUser);
router.use("/login", routerLogin);

router.use("/config", routerConfig);


module.exports = router;
