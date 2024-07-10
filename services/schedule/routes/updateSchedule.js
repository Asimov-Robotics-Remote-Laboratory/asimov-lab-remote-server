const express = require('express');
const servicesAuthenticator = require('../../../middlewares/servicesAuthenticator');
const updateSchedule = require('../business/updateSchedule');
const adminValidator = require('../../../middlewares/adminValidator');

const router = express.Router();

router.put('/', servicesAuthenticator, async (request, response) => {
        try {
            const schedule = await updateSchedule(request.user, request.body);
            response
                .status(200)
                .json(schedule);
        } catch (error) {
            response
                .status(400)
                .json(error);
        }
    }
);

module.exports = router;