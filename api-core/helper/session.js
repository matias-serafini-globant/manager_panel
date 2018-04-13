/*
*helper for make session
*
*/
"use strict";
var crypto = require('crypto');
var expires = require('expires');
var timestamp = expires.after('2 days');
var Redis = require('ioredis');

function setRedis(data){
    // var redis = new Redis(ConfigServer.redisServer);
    // redis.set("OP-LIST-SESSION-", JSON.stringify(data));
    // redis.quit();
}

module.exports = {
    /**
    * function helper for insert session
    * @param {object} userId
    * @param {object} data
    */
    insert: function(userId, data) {
        var tokenData = {
            userId: userId,
            token: crypto.randomBytes(32).toString('hex'),
            expiration_date: timestamp
        };
        _.extend(tokenData, data);
        if (ListSession[userId] && _.isArray(ListSession[userId].tokens)) {
            ListSession[userId].tokens.push(tokenData);
        } else {
            ListSession[userId] = {
                tokens: [tokenData]
            };
        }
        setRedis(ListSession);
        return tokenData;
    },
    /**
    * function helper for Token
    * @param {object} userId
    * @param {object} tokenData
    */
    get: function(userId, tokenData) {
        var userTokens = ListSession[userId].tokens;

        if (ListSession[userId] && _.isArray(userTokens)) {
            var results = _.find(userTokens, function(item) {
                return item.token === tokenData;
            });
            if (!_.isEmpty(results)) {
                return userTokens;
            }
        }
        return false;
    },
    /**
    * function helper for get Token
    * @param {object} tokenData
    */
    getByToken: function(tokenData) {
        var findUserToken = null;
        _.find(ListSession, function(item) {
            if(!item || !item.tokens){
                return false;
            }
            var findToken = _.find(item.tokens, function(data) {
                return data.token === tokenData.token;
            });
            if (!_.isEmpty(findToken)) {
                findUserToken = findToken;
            }
        });
        if (!_.isEmpty(findUserToken)) {
            return findUserToken;
        }

        return false;
    },
    /**
    * function helper for update session
    *
    * @param {object} userId
    * @param {object} data
    */
    update: function(userId, data) {
        if (ListSession[userId] && _.isArray(ListSession[userId].tokens)) {
            var length = ListSession[userId].tokens.length;
            for (var i = 0; i < length; i += 1) {
                _.extend(ListSession[userId].tokens[i], data);
            }
            return true;
        }
        return false;
    },
    /**
    * function helper for delete session
    *
    * @param {object} userId
    */
    deleteAll: function(userId) {
        delete ListSession[userId];
        return true;
    },

    /**
    * function function for delete tokens
    *
    * @param {object} userId
    * @param {object} tokenData
    */
    delete: function(userId, tokenData) {
        var globalIndex;
        ListSession[userId].tokens.find(function(item, index){ 
            if(item.token === tokenData.token){ 
                globalIndex = index;
            } 
        });
        if(globalIndex>-1){
            ListSession[userId].tokens.splice(globalIndex, 1);
            setRedis(ListSession);
            return true;
        }
        return false;
    }
};

