//router for user
"use strict";

var express = require('express');

var hasher = require('../../helper/hasher');
var userController = require('./controller');

//var configValidator = require('./validator');
//var validator = require('../../route/validation');

var router = express.Router();

//validator(configValidator);

//router.use(validator);
/**
 * Route method for get users
 *
 * @param {object} req
 * @param {objetc} res
 * @param {function} next
 */

router.get("/all", function (req, res, next) {
    if (req.session.rol_id !== 1) {
        //return res.sender(new MessageHandler("permission"), next);
    }
    userController.getUsers(function (err, data) {
        if (err || _.isEmpty(data)) {
            return res.sender(new MessageHandler("server"), next);
        }
        res.sender(new MessageHandler(data, true), next);
    });
});


/**
 * Route method for get 1 user by name
 *
 * @param {object} req
 * @param {objetc} res
 * @param {function} next
 */

router.get("/id", function (req, res, next) {
    if (req.session.rol_id !== 1) {
        //return res.sender(new MessageHandler("permission"), next);
    }
    var id = req.query.id;
    if (_.isEmpty(id)) {
        res.sender(new MessageHandler("server"), next);
    }

    userController.getUser(id, function (err, data) {
        if (err || _.isEmpty(data)) {
            return res.sender(new MessageHandler("server"), next);
        }
        res.sender(new MessageHandler(data, true), next);
    });
});

/**
 * Route method for get your self user
 *
 * @param {object} req
 * @param {objetc} res
 * @param {function} next
 */

router.get("/", function (req, res, next) {
    var id = req.session.userId;
    if (!id) {
        return res.sender(new MessageHandler("server"), next);
    }

    userController.getUser(id, function (err, data) {
        if (err || _.isEmpty(data)) {
            return res.sender(new MessageHandler("server"), next);
        }
        res.sender(new MessageHandler(data, true), next);
    });
});

/**
 * Route method for create user
 *
 * @param {object} req
 * @param {objetc} res
 * @param {function} next
 */

router.post("/", function (req, res, next) {
    if (req.session.rol_id !== 1) {
    //    return res.sender(new MessageHandler("permission"), next);
    }
    var userData = req.body;
    userData.password = hasher.password(userData.password);

    if (!_.isEmpty(userData)) {
        userController.getUserByEmail(userData.email, function (err, data) {
            if (err || !_.isEmpty(data)) {
                return res.sender(new MessageHandler("alreadyExist"), next);
            }
            userController.insertUser(userData, function (err, data) {
                if (err || _.isEmpty(data)) {
                    return res.sender(new MessageHandler(err), next);
                }
                res.sender(new MessageHandler(data, true), next);
            });
        });
        return;
    }
    return res.sender(new MessageHandler("server"), next);

});

/**
 * Route method for update self user
 *
 * @param {object} req
 * @param {objetc} res
 * @param {function} next
 */

router.put("/", function (req, res, next) {
    var userData = req.body;
    var id = req.session.userId;
    if (_.isEmpty(userData)) {
        return res.sender(new MessageHandler("passwordIsEmpty"), next);
    }
    if (!_.isEmpty(userData.password)) {
        userData.password = hasher.password(userData.password);
    } else {
        delete userData.password;
    }
    
    userController.updateUser(userData, id, function (err, data) {
        if (err || _.isEmpty(data)) {
            return res.sender(new MessageHandler(err), next);
        }
        res.sender(new MessageHandler(userData, true), next);
    });

});

/**
 * Route method for update user password
 *
 * @param {object} req
 * @param {objetc} res
 * @param {function} next
 */

router.put("/password", function (req, res, next) {
    var userPassword = req.body;
    var id = req.session.userId;
    if (_.isEmpty(userPassword)) {
        return res.sender(new MessageHandler("passwordIsEmpty"), next);
    }

    userController.updatePassword(userPassword, id, function (err, data) {
        if (err || _.isEmpty(data)) {
            return res.sender(new MessageHandler(err), next);
        }
        res.sender(new MessageHandler({}, true), next);
    });
});

/**
 * Route method for update user
 *
 * @param {object} req
 * @param {objetc} res
 * @param {function} next
 */

router.put("/id", function (req, res, next) {
    if (req.session.rol_id !== 1) {
        //return res.sender(new MessageHandler("permission"), next);
    }
    var userData = req.body;
    var id = req.query.id;

    if (!_.isEmpty(userData.password)) {
        userData.password = hasher.password(userData.password);
    } else {
        delete userData.password;
    }
    if (!_.isEmpty(userData)) {
        userController.updateUser(userData, id, function (err, data) {
            if (err || _.isEmpty(data)) {
                return res.sender(new MessageHandler(err), next);
            }
            res.sender(new MessageHandler(data, true), next);
        });
    }
});

module.exports = router;