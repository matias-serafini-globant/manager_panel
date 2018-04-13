"use strict";

var express = require('express');
var bodyParser = require('body-parser');
var useragent = require('express-useragent');

var init = require('./lib/init');
var authorized = require('./lib/authorized');
var routerMaster = require('./route/index');

var Ddos = require('./lib/ddos/index');
var ddos = new Ddos();

var app = express();

app.use('/media', express.static(__dirname + '/../panels'));

app.use(ddos.express);

app.use(init.console);
app.use(init.crossOrigin);
app.use(init.sender);

app.use(bodyParser.json({
    limit: '50mb'
}));

app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err.message });
});

app.use(useragent.express());

app.use(authorized);

app.use("/", routerMaster);

module.exports = app;
