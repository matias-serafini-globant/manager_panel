"use strict";
var routeConfig = {};
var validator = {};
/**
 * Function for route validation
 *
 * @param {object} arguments
 */
function validation() {
    if(arguments.length===1){
        validator.set.apply(validator, arguments);
    }
    if(arguments.length===3){
        validator.middleware.apply(validator, arguments);
    }
}

validator = {
    /**
     * Method for set require parameters
     *
     * @param {object} config
     */
    set : function(config){
        _.extend(routeConfig, _.clone(config));
    },

    /**
     * Method for validation all input parameters
     *
     * @param {object} req
     * @param {object} res
     * @param {function} next
     */
    middleware : function(req, res, next){
        var method = req.method.toLowerCase();
        var url = req.originalUrl.split("?")[0].toLowerCase();

        if(!routeConfig || !routeConfig[url] || !routeConfig[url][method]){
            return next();
        }
        var config = routeConfig[url][method];

        var outQuery = {};
        if(config.query){
            outQuery = this.check(req.query, config.query);
            if(!outQuery){
                return res.sender(new MessageHandler('request'));
            }
        }

        var outBody = {};
        if(config.body){
            outBody = this.check(req.body, config.body);
            if(!outBody){
                return res.sender(new MessageHandler('request'));
            }
        }

        req.body = outBody;
        req.query = outQuery;
        next();
    },

    /**
     * Method for check data
     *
     * @param {object} data
     * @param {object} config
     */
    check: function(data, config){
        var outParam = {};
        var configParam = config;
        var paramKeys = Object.keys(configParam);
        for(var index=0;index<paramKeys.length;index+=1){
            var key = paramKeys[index];
            var val = data[key];
            if(configParam[key].require && ((configParam[key].type === "number" && !val) || (configParam[key].type !== "number" && _.isEmpty(val)))){
                console.log("key: ", key)
                return false;
            }
            var type = configParam[key].type;
            if(val && !this.validType(val, type)){
                console.log("type: ", type, val, key)
                return false;
            }
            if(val){
                outParam[key] = val;
            }
        }
        return outParam;
    },

    /**
     * Method for valid type
     *
     * @param {all} val
     * @param {string} type
     */
    validType: function(val, type){
        if(typeof val === type){
            return true;
        }
        return false;
    }

};

module.exports = validation;