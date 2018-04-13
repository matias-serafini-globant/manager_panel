//connection to the database MYSQL
"use strict";
var mysql = require('mysql');
var connection = mysql.createPool(ConfigServer.mysql);
var connectionNew = mysql.createConnection(ConfigServer.mysql);



connectionNew.connect(function(err) {
    if(err){
        return console.log("Without DB connection");
    }
    
    connectionNew.config.queryFormat = function(query, values) {
        if (!values){
          return query;  
        } 
        return query.replace(/\:(\w+)/g, function(txt, key) {
            if (values.hasOwnProperty(key)) {
                return this.escape(values[key]);
            }
            return txt;
        }.bind(this));
    };
});

module.exports = {
    'conn': connection,
    'connNew': connectionNew
};