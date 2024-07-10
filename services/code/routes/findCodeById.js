const express = require('express');
const router = express.Router();
const servicesAuthenticator = require('../../../middlewares/servicesAuthenticator');
const findCodeById = require('../business/findCodeById');

router.get('/id/:id', servicesAuthenticator, async (request, response) => {
    try {
        const code = await findCodeById(request.user,request.params.id);
        return response
            .status(200)
            .json(code);
    } catch (error) {
        response
            .status(404)
            .json(error);
    }
});

module.exports = router;