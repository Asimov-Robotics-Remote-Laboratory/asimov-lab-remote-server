const express = require('express');
const router = express.Router();
const servicesAuthenticator = require('../../../middlewares/servicesAuthenticator');
const listUserSchedules = require('../business/listUserSchedules');

router.get('', servicesAuthenticator, async (request, response) => {
    try {
        const schedules = await listUserSchedules(request.user.id);
        response
            .status(200)
            .send(schedules)
    } catch (error) {
        response
            .status(400)
            .json(error)
    }
});

module.exports = router;