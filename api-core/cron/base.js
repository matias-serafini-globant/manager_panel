"use strict";
var CronJob = require('cron').CronJob;

//Cron Base

new CronJob('0 0 * * *', function() {

}, null, true, 'America/Los_Angeles');