/*
*defined globals variable
*
*/
"use strict";
var fs = require('fs');
var Redis = require('ioredis');
var cluster = require('cluster');
var configServer = require('../config/server.json');
var configHandler = require('../handler/config.json');

var init, geoip2;

try{
    geoip2 = require('geoip2');
    geoip2.init();
}catch(err){
    geoip2 = {
        lookupSimpleSync: function(){
            return {
                country: "Undefined"
            };
        }
    };
}
global.geoip2 = geoip2;

try {
    init = require('../config/instance.json');
}catch(err){
    init = {};
}

var globalInit = {
    run: function(){
        if(!global.SessionRun){
            this.globalConfig();
        }
    },
    
    globalConfig: function (){
        global.SessionRun = true;
        global._ = require('lodash');
        global.ConfigServer = this.setInitConfig();
        global.MSConnection = require('../db/mysql.js');
        this.getBasicTokens();
        this.existDirectoryLog();
        _.mixin({
            capitalize: function(string) {
                return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
            }
        });
        this.messageHandler();
        this.forMaster();
    },

    getBasicTokens: function(){
        global.BasicTokens = {};
        require('./basicToken.js')(function(err, result){
            if(err){
                return console.log(err);
            }
            global.BasicTokens = result;
        });
    },

    messageHandler: function(){
        global.MessageHandler = function(param, success){
            if(success){
                return [200, {
                    'status'    : 'success',
                    'data'      : param
                }];
            }
            var out;
            if(configHandler[param]){
                out = [configHandler[param].status, configHandler[param]];
            }else{
                console.log("No existe param");
                console.log(param);
                out = [500, {
                    "status": 500,
                    "message": "Server error"
                }];
            }
            return out;
        };
    },

    setInitConfig: function (){
       return _.extend(configServer, init);
    },

    existDirectoryLog: function (){
        fs.readdir(ConfigServer.log.parentDirectoryPath, function(err, files){
            if(err){
                console.log(err);
                return;
            }
            for(var i=0; i<files.length; i += 1){
                if(files[i] === "api-core"){
                    return;
                }
            }
            fs.mkdir(ConfigServer.log.directoryPath, function(err){
                return;
            });
        });
    },

    forMaster: function (){
        global.ListSession = {};
        global.ListClient = {};
        //this.setSession();
        require('../cron/base.js');
    },

    setSession: function (){
        var redisSession = new Redis(ConfigServer.redisServer);
        var tokenKey = "PANEL-PLUGIN-LIST-SESSION";
        redisSession.get(tokenKey, function(err, result) {
            redisSession.quit();
            if(result){
                result = JSON.parse(result);
                global.ListSession = result;
            }
        });

        var redisClient = new Redis(ConfigServer.redisServer);
        tokenKey = "PANEL-PLUGIN-LIST-CLIENT";
        redisClient.get(tokenKey, function(err, result) {
            redisClient.quit();
            if(result){
                result = JSON.parse(result);
                global.ListClient = result;
            }
        });
    }
};

globalInit.run();