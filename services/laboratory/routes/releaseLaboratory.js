const express = require('express');
const router = express.Router();
const servicesAuthenticator = require('../../../middlewares/servicesAuthenticator');
const releaseLaboratory = require('../business/releaseLaboratory');

router.get('/release/id/:id', servicesAuthenticator, async (request, response) => {
    try {
        await releaseLaboratory(request.params.id, request.user._id);
        response
            .status(200)
            .send();

    } catch (error) {
        response
            .status(400)
            .send(error);
    }
});

module.exports = router;