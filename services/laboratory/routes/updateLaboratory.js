const express = require('express');
const servicesAuthenticator = require('../../../middlewares/servicesAuthenticator');
const updateLaboratory = require('../business/updateLaboratory');
const adminValidator = require('../../../middlewares/adminValidator');

const router = express.Router();

router.put('/', servicesAuthenticator,adminValidator, async (request, response) => {
        try {
            const laboratory = await updateLaboratory(request.body);
            response
                .status(200)
                .json(laboratory);
        } catch (error) {
            response
                .status(400)
                .json(error);
        }
    }
);

module.exports = router;