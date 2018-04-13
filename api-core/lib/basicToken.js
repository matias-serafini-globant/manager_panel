/*
*make basicToken Authorization
*
*/
"use strict";

module.exports = function(callback) {
    (function getmeTokens(){
        MSConnection.conn.query('SELECT id, name, token FROM application', function (err, result) {
            var out = {};
            if (_.isEmpty(result)) {
                setTimeout(function(){
                    getmeTokens()
                },5000);
                return callback("Whitout Basic TOKENS!!!");
            }
            for (var i = 0; i < result.length; i+= 1) {
                out[result[i].token] = { "applicationId" : result[i].id };
            }
            callback(null, out);
        });
    })();
};