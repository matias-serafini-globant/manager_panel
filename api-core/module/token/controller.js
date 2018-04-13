//controller for token
"use strict";
var session = require('../../helper/session.js');
var BaseController = require('../baseController.js');
var queries = require('./queries.js');

var controllerToken = new BaseController({
	/**
	* controller method for insert ratings
	*
	* @param {object} userId
	* @param {function} callback
	*/
    insertToken: function(userId, callback) {
        var token = session.generateToken(userId);
        callback(null, token);
    },
    /**
     * controller method for get user login
     *
     * @param {object} userData
     * @param {function} callback
     */
    getUserLogin: function(userData, callback) {
        this.executeQuery(queries.getUserLogin, userData, function(err, row) {
            callback(err, row);
        });
    }
});

module.exports = controllerToken;