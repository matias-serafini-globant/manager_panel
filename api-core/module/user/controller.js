//controller for user
"use strict";
var async = require('async');

var queries = require('./queries.js');
var BaseController = require('../baseController.js');

var hasher = require('../../helper/hasher');
var sessionHelper = require('../../helper/session');

var controllerUser = new BaseController({
    /**
    * controller for get users
    * @param {function} callback
    */
    getUsers: function (callback) {
        this.executeQuery(queries.getUsers, function (err, rows) {
            callback(err, rows);
        });
    },
    /**
    * controller for get user
    * @param {object} id
    * @param {function} callback
    */
    getUser: function (id, callback) {
        this.executeQuery(queries.getUser, { id: id }, function(err, result){
            if(err || _.isEmpty(result)){
                return callback ("server");
            }
            callback (err, result);
        });
    },
    /**
     * controller method for get userEmail
     *
     * @param {object} email
     * @param {function} callback
     */
    getUserByEmail: function (email, callback) {
        this.executeQuery(queries.getUserByEmail, {
            email: email
        }, callback);

    },
    /**
     * controller method for insertUser
     *
     * @param {object} userData
     * @param {function} callback
     */
    insertUser: function (userData, callback) {
        var that = this;


        async.waterfall([

            function (cb) {
                that.createConnection(function (connection) {
                    cb(null, connection);
                });
            },
            function (connection, cb) {
                that.beginTransaction(connection, function (err, conn) {
                    if (err) {
                        return cb(err, conn);
                    }
                    cb(null, conn);
                });
            },
            function (conn, cb) {
                that.doQuery(conn, queries.insertUser, [userData], function (err, row) {
                    if (_.isEmpty(row)) {
                        return cb("server", conn);
                    }
                    userData.userId = row.insertId;
                    cb(null, conn);
                });
            },
            function (conn, cb) {
                if(userData.rol_id != 6)
                    return cb(null, conn);

                that.doQuery(conn, queries.insertClient, [{
                    user_id: userData.userId,
                }], function (err, row) {
                    console.log(arguments)
                    if (err) {
                        return cb("server", conn);
                    }
                    cb(null, conn);
                });
            }
        ],
            function (err, conn) {
                if (err) {
                    that.rollbackTransaction(conn, function () {
                        return callback(err);
                    });
                    return;
                }

                delete userData.password;

                that.commitTransaction(conn, function (status) {
                    return callback(null, userData);
                });
            }
        );
    },
    /**
     * controller method for update user
     *
     * @param {object} userData
     * @param {object} userId
     * @param {function} callback
     */
    updateUser: function (userData, userId, callback) {
        var that = this;
        var pluginData = userData.plugins;
        var pluginDataOut = userData.plugins;


        delete userData.user_id;


        async.waterfall([

            function (cb) {
                that.createConnection(function (connection) {
                    cb(null, connection);
                });
            },
            function (connection, cb) {
                that.beginTransaction(connection, function (err, conn) {
                    if (err) {
                        return cb(err, conn);
                    }
                    cb(null, conn);
                });
            },
            function (conn, cb) {
                delete userData.plugins;

                if (_.isEmpty(userData)) {
                    return cb(null, conn);
                }
                delete userData.id;
                that.doQuery(conn, queries.updateUser, [userData, userId], function (err, row) {
                    console.log(arguments)
                    if (_.isEmpty(row)) {
                        return cb("server", conn);
                    }

                    cb(null, conn);
                });
            },
            function (conn, cb) {
                if (!pluginData) {
                    return cb(null, conn);
                }
                that.doQuery(conn, queries.deleteUserPlugin, userId, function (err, row) {
                    console.log(arguments)
                    if (_.isEmpty(row)) {
                        return cb("server", conn);
                    }

                    cb(null, conn);
                });
            },
            function (conn, cb) {
                var userPlugin = [];
                if (_.isEmpty(pluginData)) {
                    return cb(null, conn);
                }

                pluginData.forEach(function (item) {
                    userPlugin.push([userId, item]);
                });

                that.doQuery(conn, queries.insertUserPlugin, [userPlugin], function (err, row) {
                    if (_.isEmpty(row)) {
                        return cb("server", conn);
                    }
                    cb(null, conn);
                });
            },
            function (conn, cb) {
                if(userData.rol_id != 6)
                    return cb(null, conn);

                that.doQuery(conn, queries.updateClient, [{
                    seller_id: clientSeller_id,
                    delivery_id: clientDelivery_id
                },userId], function (err, row) {
                    console.log(arguments)
                    if (err) {
                        return cb("server", conn);
                    }
                    cb(null, conn);
                });
            }
        ],
            function (err, conn) {
                if (err) {
                    that.rollbackTransaction(conn, function () {
                        return callback(err);
                    });
                    return;
                }
                if(pluginDataOut){
                    _.extend(userData, { plugins: pluginDataOut });
                }
                _.extend(userData,{userId : userId});
                delete userData.password;

                if(userData.status_id === 2){
                    sessionHelper.deleteAll(userId);
                }
                else{
                    sessionHelper.update(userId, userData);
                }

                that.commitTransaction(conn, function (status) {
                    return callback(null, userData);
                });
            }
        );
    },
    /**
     * controller method for get userPassword
     *
     * @param {object} id
     * @param {function} callback
     */
    getPassword: function (id, callback) {
        this.executeQuery(queries.getPassword, { id: id }, function (err, result) {
            if (_.isEmpty(result) || _.isEmpty(result[0].password)) {
                return callback("server");
            }
            callback(null, result[0].password);
        });
    },
    daleteUser: function (id, callback) {
        this.executeQuery(queries.deleteUser, { id: id }, function (err, result) {
            if (_.isEmpty(result)) {
                return callback("server");
            }
            callback(null, result);
        });
    },
    /**
     * controller method for update userPassword
     *
     * @param {object} Password
     * @param {object} id
     * @param {function} callback
     */
    updatePassword: function (dataPassword, id, callback) {

        var that = this;
        var oldPassword = dataPassword.oldPassword;
        var newPassword = dataPassword.newPassword;

        this.getPassword(id, function (err, data) {

            if (err || _.isEmpty(data)) {
                return callback("server");
            }
            oldPassword = hasher.password(oldPassword);

            if (data !== oldPassword) {
                return callback("cantPass");
            }
            newPassword = hasher.password(newPassword);
            newPassword = {
                password: newPassword
            };

            that.executeQuery(queries.updateUser, [newPassword, id], function (err, result) {
                if (_.isEmpty(result)) {
                    return callback("server");
                }
                var out = {
                    "changedRows": result.changedRows
                };
                callback(null, out);
            });
        });

    },
    /**
    * controller method for insert plugins in users
    *
    * @param {object} data
    * @param {object} userId
    * @param {function} callback
    */
    insertUserPlugin: function (data, userId, callback) {
        var that = this;
        async.waterfall([

            function (cb) {
                that.createConnection(function (connection) {
                    cb(null, connection);
                });
            },
            function (connection, cb) {
                that.beginTransaction(connection, function (err, conn) {
                    if (err) {
                        return cb(err, conn);
                    }
                    cb(null, conn);
                });
            },
            function (conn, cb) {

                that.doQuery(conn, queries.deleteUserPlugin, userId, function (err, row) {
                    if (_.isEmpty(row)) {
                        return cb("server", conn);
                    }

                    cb(null, conn);
                });
            },
            function (conn, cb) {
                var userPlugin = [];
                data.forEach(function (item) {
                    userPlugin.push([userId, item]);
                });

                that.doQuery(conn, queries.insertUserPlugin, [userPlugin], function (err, row) {
                    if (_.isEmpty(row)) {
                        return cb("server", conn);
                    }
                    cb(null, conn);
                });
            },
        ],
            function (err, conn) {
                if (err) {
                    that.rollbackTransaction(conn, function () {
                        return callback(err);
                    });
                    return;
                }

                that.commitTransaction(conn, function (status) {
                    return callback(null, status);
                });
            }
        );
    }
});

module.exports = controllerUser;