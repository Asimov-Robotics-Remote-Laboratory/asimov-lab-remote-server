const express = require('express');
const servicesAuthenticator = require('../../../middlewares/servicesAuthenticator');
const createLaboratory = require('../business/createLaboratory');
const adminValidator = require('../../../middlewares/adminValidator');

const router = express.Router();

router.post('/', servicesAuthenticator, adminValidator, async (request, response) => {
        try {
            await createLaboratory(request.body);
            response
                .status(200)
                .send();
        } catch (error) {
            response
                .status(400)
                .json(error);
        }
    }
);

module.exports = router;