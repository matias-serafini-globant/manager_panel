"use strict";
var allRoutes = require('../route/config');
var sessionHelper = require('../helper/session');
    
/**
 * function for getUsers-Agent
 *
 * @param {object} req
 */
function getUserAgent(req) {
    var data = req.useragent;

    var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
	var country = geoip2.lookupSimpleSync(ip).country;
	if (country === "Undefined") {
		country = "**";
	}
    return {
        platform: data.platform,
        browser: data.browser,
        ip: ip,
        country: country
    };
}

/**
 * function for get Token
 * @param {object} headers
 */
function getToken(headers) {
	var token = headers.authorization;
	return decodeURIComponent(token);
}

/**
 * function for valid tokens
 * @param {object} headers
 * @param {object} regex
 */
function validToken(headers, regex) {
	var token = getToken(headers);
	if (token) {
		token = regex.exec(token);
		return token && token[2] ? token[2] : false;
	}
	return false;
}

/**
 * function for valid Bearer
 *
 * @param {object} headers
 * @param {function} cb
 */
function validBearer(headers, cb) {
	var token = validToken(headers, /(Bearer) (\W.+|\w.+)/);
	if (token) {
		var session = sessionHelper.getByToken({ 'token': token });
		if (session) {
			return cb(null, session);
		}
	}
	cb('permission');
}

/**
 * function for valid Basic
 * @param {object} headers
 * @param {function} cb
 */
function validBasic(headers, cb) {
	var token = validToken(headers, /(Basic) (\W.+|\w.+)/);
	if (token && BasicTokens[token]) {
		//valdia contra base de datos el basic token
		return cb(null, BasicTokens[token]);
	}
	cb('permission');
}

/**
 * function for validator
 * @param {object} route
 * @param {object} method
 * @param {object} headers
 * @param {function} cb
 */
function validator(route, method, headers, cb) {
	if (_.isEmpty(route) || (route.method !== '*' && !_.includes(route.method, method))) {
		return cb('permission');
	}

	if (route.exclude) {
		return cb(null, {});
	}

	if (route.bearer) {
		return validBearer(headers, cb);
	}

	if (route.basic) {
		return validBasic(headers, cb);
	}

	return false;
}

 /*
 * @param {object} req
 * @param {objetc} res
 * @param {function} next
 */
module.exports = function (req, res, next) {
	var method = req.method;
	var url = req.originalUrl.split("?")[0];
	var route = allRoutes[url];
	var headers = req.headers;
    var userAgentData = getUserAgent(req);

	validator(route, method, headers, function (err, session) {
		if (err) {
			res.sender(new MessageHandler(err));
			return;
		}
		session.userAgent = userAgentData;
		req.session = session;
		next();
	});
};

