const express = require('express');
const servicesAuthenticator = require('../../../middlewares/servicesAuthenticator');
const removeSchedule = require('../business/removeSchedule');
const adminValidator = require('../../../middlewares/adminValidator');

const router = express.Router();
router.delete('/id/:id', servicesAuthenticator, async (request, response) => {
        try {
            await removeSchedule(request.user,request.params.id);
            return response
                .status(200)
                .send();
        } catch (error) {
            return response
                .status(400)
                .json(error);
        }
    }
);

module.exports = router;