const express = require('express');
const router = express.Router();
const servicesAuthenticator = require('../../../middlewares/servicesAuthenticator');
const listUserCodes = require('../business/listUserCodes');

router.get('/', servicesAuthenticator, async (request, response) => {
    try {
        const codes = await listUserCodes(request.user.id);
        response
            .status(200)
            .send(codes)
    } catch (error) {
        response
            .status(400)
            .json(error)
    }
});

module.exports = router;