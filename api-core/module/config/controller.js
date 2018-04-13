/**
* Controller for Config
**/
"use strict";

var async = require('async');
var queries = require('./queries.js');
var BaseController = require('../baseController.js');

var controllerUser = new BaseController({
    /**
     * controller method for getConfig
     * @param {function} callback
     */
    getConfig: function(callback) {
        this.executeQuery(queries.getConfig, function(err, rows) {
            callback(err,rows);
        });
    },

    /**
     * controller method for updateConfig
     * @param {function} callback
     */
    updateConfig: function(data, callback) {
        var that = this;
        data.forEach(function(item){
            console.log(item)
            that.executeQuery(queries.updateConfig, [item, item.key], function(err, rows) {
                console.log(arguments)
                callback(err,rows);
            });
        });
    }
});

module.exports = controllerUser;