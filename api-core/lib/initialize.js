/*
*function to initialize app
*
*/
"use strict";
var http = require('http');
var numCPUs = require('os').cpus().length;
var portConfig = ConfigServer.port.staging || ConfigServer.port.production;
module.exports = {
    numCPUs: 1,
    onError: function(error) {
        if (error.syscall !== 'listen'){
            throw error;
        }
        var bind = typeof portConfig === 'string' ? 'Pipe ' + portConfig : 'Port ' + portConfig ;
        switch (error.code) {
            case 'EACCES':
            case 'EADDRINUSE':
                process.exit(1);
                break;
            default:
                throw error;
        }
    },
    runCluster: function(app){
        var serverStaging, serverProduction;

        if(ConfigServer.port.staging){
            serverStaging = http.createServer(app).listen(ConfigServer.port.staging);
            serverStaging.on('error', this.onError);
        }
        if(ConfigServer.port.production){
            serverProduction = http.createServer(app).listen(ConfigServer.port.production);
            serverProduction.on('error', this.onError);
        }
    }
};