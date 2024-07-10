const express = require('express');
const servicesAuthenticator = require('../../../middlewares/servicesAuthenticator');
const adminValidator = require('../../../middlewares/adminValidator');
const router = express.Router();
const removeUser = require('../business/removeUser');

router.delete('/id/:id', servicesAuthenticator, adminValidator, async (request, response) => {
    try {
        await removeUser(request.params.id);
        response
            .status(200)
            .send()
    } catch (error) {
        response
            .status(400)
            .json(error)
    }
});

module.exports = router;