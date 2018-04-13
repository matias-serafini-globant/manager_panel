/*
*defined init
*
*/
"use strict";
exports.crossOrigin = function (req, res, next) {
    var oneof = false;
    if (req.headers.origin) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        oneof = true;
    }
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Authorization, Content-Type, Accept, Origin");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    if (oneof) {
        res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365);
    }
    if (req.method === 'OPTIONS'){
        res.status(200).send();
    }else{
        next();
    }
};

exports.sender = function (req, res, next) {
    res.sender = function(Arg, next){
        if(!this.sendFlag) {
            if(_.isArray(Arg)){
                res.sendStatus = Arg[0];
                Arg = [Arg[1]];
            }
            this.sendFlag = 1;
            if(typeof Arg === "object"){
                res.json.apply(this, Arg);
            }else{
                res.send(Arg);
            }
            
            if(next){
                next();
            }
            return;
        }
        console.log("Se envio dos veces");
    };
    next();
};

exports.console = function (req, res, next) {
    console.log(req.method);
    console.log(req.originalUrl.split("?")[0]);
    console.log();
    next();
};