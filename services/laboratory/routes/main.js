const createLaboratory = require('./createLaboratory');
const findLaboratoryById = require('./findLaboratoryById');
const listLaboratories = require('./listLaboratories');
const useLaboratory = require('./useLaboratory');
const releaseLaboratory = require('./releaseLaboratory');
const authenticateLaboratoryAgent = require('./authenticateLaboratoryAgent');
const removeLaboratory = require('./removeLaboratory');
const updateLaboratory = require('./updateLaboratory');

module.exports = [
	createLaboratory,
	findLaboratoryById,
	listLaboratories,
	useLaboratory,
	releaseLaboratory,
	authenticateLaboratoryAgent,
	removeLaboratory,
	updateLaboratory
]