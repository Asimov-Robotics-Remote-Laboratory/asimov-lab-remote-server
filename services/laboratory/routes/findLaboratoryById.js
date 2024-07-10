const express = require('express');
const router = express.Router();
const servicesAuthenticator = require('../../../middlewares/servicesAuthenticator');
const findLaboratoryById = require('../business/findLaboratoryById');

router.get('/id/:id', servicesAuthenticator, async (request, response) => {
    const token = request.header('x-auth-token');
    try {
        const laboratory = await findLaboratoryById(request.params.id, token);
        response
            .status(200)
            .json(laboratory);
    } catch (error) {
        response
            .status(400)
            .send(error);
    }
});

module.exports = router;