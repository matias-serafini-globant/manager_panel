/*
*helper for make hash
*
*/
"use strict";
var crypto = require('crypto');
var _ = require('lodash');

module.exports	=	{
    /**
     * function helper for make sha1 password
     *
     * @param {object} clientData
     * @param {object} id
     * @param {function} callback
     */
	password: function(data){
		if (_.isString(data)) {
			return crypto.createHash('sha1').update(data).digest('hex');
		}
		return '';
	}
};