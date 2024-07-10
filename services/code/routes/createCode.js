const express = require('express');
const servicesAuthenticator = require('../../../middlewares/servicesAuthenticator');
const createCode = require('../business/createCode');

const router = express.Router();

router.post('/', servicesAuthenticator, async (request, response) => {
        try {
            const file = await createCode(request.body, request.user.id);
            response
                .status(200)
                .json(file);
        } catch (error) {
            response
                .status(400)
                .json(error);
        }
    }
);

module.exports = router;