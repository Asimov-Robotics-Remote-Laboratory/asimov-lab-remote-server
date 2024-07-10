const express = require('express');
const router = express.Router();
const servicesAuthenticator = require('../../../middlewares/servicesAuthenticator');
const useLaboratory = require('../business/useLaboratory');

router.get('/use/id/:id', servicesAuthenticator, async (request, response) => {
    try {
        const laboratory = await useLaboratory(request.params.id, request.user._id);
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