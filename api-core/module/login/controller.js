/*
*controller for login
*
*/
"use strict";
var session = require('../../helper/session.js');
var BaseController = require('../baseController.js');

var queries = require('./queries.js');

var controllerToken = new BaseController({
    /**
     * controller method for insert a token
     *
     * @param {object} userId
     * @param {object} data
     * @param {function} callback
     */
    insertToken: function (userId, data, callback) {
        delete data.password;
        var token = session.insert(userId, data);
        callback(null, token);
    },
    /**
     * controller method for get Users Login
     *
     * @param {object} userData
     * @param {function} callback
     */
    getUserLogin: function (userData, callback) {
        this.executeQuery(queries.getUserLogin, userData, function (err, result) {
            callback(err, result);
        });
    },
    /**
     * controller method for update login users
     *
     * @param {object} userData
     * @param {function} callback
     */
    loginUser: function (userData, callback) {
        var that = this;
        this.getUserLogin(userData, function (err, user) {
            if (err || _.isEmpty(user)) {
                return callback('cantFindUser');
            }
            that.insertToken(user[0].id, user[0], function (err, data) {
                if (err || _.isEmpty(data)) {
                    return callback('server');
                }
                delete user[0].password;
                delete user[0].id;
                _.extend(data, user[0]);
                callback(null, data);

            });
        });
    }
});


module.exports = controllerToken;
