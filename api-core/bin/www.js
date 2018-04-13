/**
 * bin/www File
 * Decription
 */

require('../handler/signal');
require('../lib/global');

var app = require('../app');
var initialize = require('../lib/initialize');

initialize.runCluster(app);