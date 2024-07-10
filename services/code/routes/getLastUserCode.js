const express = require('express');
const router = express.Router();
const servicesAuthenticator = require('../../../middlewares/servicesAuthenticator');
const getLastUserCode = require('../business/getLastUserCode');
const findUserById = require("../../user/business/findUserById");

router.get('/last/laboratoryId/:laboratoryId', servicesAuthenticator, async (request, response) => {
    try {
        const laboratoryId = request.params.laboratoryId;
        const code = await getLastUserCode(request.user,laboratoryId);
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