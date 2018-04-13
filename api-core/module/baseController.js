/*
*controller base
*/
"use strict";
var mysql = require('mysql');
var paramConnection = ConfigServer.mysql;

function baseController(ob) {
    /* jshint ignore:start */
    _.extend(this, ob);
    /* jshint ignore:end */
}

baseController.prototype = {

    /**
     * Method for execute query
     *
     * @param {string} query
     * @param {array} params
     * @param {function} cb
     */
    executeQuery : function(query, params, cb){
        if(query.search(":")>0){
            MSConnection.connNew.query(query, params, function(err, rows) {
                cb(err, rows);
            });
            return;
        }
        MSConnection.conn.query(query, params, function(err, rows) {
            cb(err, rows);
        });
    },

    /**
     * Method for create new connection
     *
     * @param {function} cb
     */
    createConnection : function(cb){
        var conn = mysql.createConnection(paramConnection);
        cb(conn);
    },

    /**
     * Method for begin new transaction
     *
     * @param {function} cb
     */
    beginTransaction : function(conn, cb){
        var that = this;
        conn.beginTransaction(function(err){
            if(err){
                that.endConnection(conn, function(){
                    return cb(err);
                });
            }
            else{
                return cb(err, conn);
            }
        });
    },

    /**
     * Method for commit transaction
     *
     * @param {function} cb
     */
    commitTransaction : function(conn, cb){
        var that = this;
        conn.commit(function(err){
            if(err){
                console.log(err);
                that.rollbackTransaction(conn, cb);
            }
            else{
                that.endConnection(conn, function(){
                    cb('Success Commit');
                });
            }
        });
    },

    /**
     * Method for rollback transaction
     *
     * @param {function} cb
     */
    rollbackTransaction: function(conn, cb){
        var that = this;
        conn.rollback(function(){
            that.endConnection(conn, cb);
        });
    },

    /**
     * Method for end connection
     *
     * @param {function} cb
     */
    endConnection : function(conn, cb){
        conn.end();
        cb();
    },
    
    /**
     * Method for execute query with param connection
     *
     * @param {function} cb
     */
    doQuery : function(conn, query, params, cb){
        conn.query(query, params, function(err, data){
           cb(err, data);
        });
    }

};

module.exports = baseController;