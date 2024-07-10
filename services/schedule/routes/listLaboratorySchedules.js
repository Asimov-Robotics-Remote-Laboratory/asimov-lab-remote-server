const express = require('express');
const router = express.Router();
const servicesAuthenticator = require('../../../middlewares/servicesAuthenticator');
const listLaboratorySchedules = require('../business/listLaboratorySchedules');

router.get('/laboratoryId/:laboratoryId', servicesAuthenticator, async (request, response) => {
    try {
        const laboratoryId = request.params.laboratoryId;
        const schedules = await listLaboratorySchedules(laboratoryId);
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