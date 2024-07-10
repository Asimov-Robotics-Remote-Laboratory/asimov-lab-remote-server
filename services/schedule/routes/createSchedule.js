const express = require('express');
const servicesAuthenticator = require('../../../middlewares/servicesAuthenticator');
const createSchedule = require('../business/createSchedule');

const router = express.Router();

router.post('/', servicesAuthenticator, async (request, response) => {
        try {
            await createSchedule(request.user, request.body);
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