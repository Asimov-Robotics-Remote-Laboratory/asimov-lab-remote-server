const express = require('express');
const router = express.Router();
const servicesAuthenticator = require('../../../middlewares/servicesAuthenticator');
const findUserById = require('../business/findUserById');

router.get('/id/:id', servicesAuthenticator, async (request, response) => {
    try {
        const user = await findUserById(request.user,request.params.id);
        return response
            .status(200)
            .json(user);
    } catch (error) {
        response
            .status(404)
            .json(error);
    }
});

module.exports = router;