const createCode = require('./createCode');
const findCodeById = require('./findCodeById');
const listUserCodes = require('./listUserCodes');
const updateCode = require('./updateCode');
const removeCode = require('./removeCode');
const getLastUserCode = require('./getLastUserCode');

module.exports = [
	createCode,
	findCodeById,
	listUserCodes,
	updateCode,
	removeCode,
	getLastUserCode
]