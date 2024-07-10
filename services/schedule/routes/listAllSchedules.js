const express = require('express');
const router = express.Router();
const servicesAuthenticator = require('../../../middlewares/servicesAuthenticator');
const listAllSchedules = require('../business/listAllSchedules');
const adminValidator = require('../../../middlewares/adminValidator');

router.get('/all', servicesAuthenticator, adminValidator, async (request, response) => {
    try {
        const schedules = await listAllSchedules();
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