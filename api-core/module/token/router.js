//router for token
"use strict";
var crypto = require('crypto');
var express = require('express');

var session = require('../../helper/session');
var validator = require('../../route/validation');
var configValidator = require('./validator');

var router = express.Router();

validator(configValidator);

router.use(validator);

router.get("/", function (req, res, next) {
    var token = {
        'token': req.session.token
    };
    var tokenSession = session.getByToken(token);
    if (_.isEmpty(tokenSession)) {
        return res.sender(new MessageHandler("invalidtoken"), next);
    }
    res.sender(new MessageHandler(tokenSession, true), next);
});

/**
 * Route method for logout session, delete tokens
 *
 * @param {object} req
 * @param {objetc} res
 * @param {function} next
 */
router.delete("/", function (req, res, next) {
    var token = {
        'token': req.session.token
    };
    var id = req.session.userId;

    var tokenSession = session.delete(id, token);
    if (!tokenSession) {
        return res.sender(new MessageHandler("invalidtoken"), next);
    }
    res.sender(new MessageHandler(tokenSession, true), next);

});



module.exports = router;