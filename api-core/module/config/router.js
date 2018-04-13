/**
* Router for generic
*
**/

"use strict";
var express = require('express');

var configController = require('./controller');
var configValidator = require('./validator');

var validator = require('../../route/validation');

var router = express.Router();
validator(configValidator);

router.use(validator);

/**
 * Route method for website
 *
 * @param {object} req
 * @param {objetc} res
 * @param {function} next
 */

router.get("/", function (req, res, next) {
    var id = req.session.id;

    configController.getConfig(function (err, data) {
        if (err || _.isEmpty(data)) {
            return res.sender(new MessageHandler("server"), next);
        }
        res.sender(new MessageHandler(data, true), next);
    });
});


router.put("/", function (req, res, next) {
    if(req.session.rol_id!=2)
        return res.sender(new MessageHandler("server"), next);
    
    var data = req.body;
    configController.updateConfig(data, function (err, data) {
        if (err || _.isEmpty(data)) {
            return res.sender(new MessageHandler("server"), next);
        }
        res.sender(new MessageHandler(data, true), next);
    });
});

module.exports = router;