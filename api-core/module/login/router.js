/*
*router for login
*
*/
"use strict";

var express = require('express');

var session = require('../../helper/session');
var loginController = require('./controller.js');
var helperhasher = require('../../helper/hasher');

var configValidator = require('./validator');
var validator = require('../../route/validation');

var router = express.Router();
validator(configValidator);

router.use(validator);

/**
 * Route method for login
 *
 * @param {object} req
 * @param {objetc} res
 * @param {function} next
 */

router.post("/", function(req, res, next) {
    var userData = req.body;
    userData.password = helperhasher.password(userData.password);

    loginController.loginUser(userData, function(err, user) {
        if (err || _.isEmpty(user)) {
            return res.sender(new MessageHandler(err), next);
        }
        res.sender(new MessageHandler(user, true), next);

    });
});


module.exports = router;