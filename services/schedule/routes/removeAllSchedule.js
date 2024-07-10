const express = require('express');
const servicesAuthenticator = require('../../../middlewares/servicesAuthenticator');
const removeAllSchedule = require('../business/removeAllSchedule');
const adminValidator = require('../../../middlewares/adminValidator');

const router = express.Router();
router.delete('', servicesAuthenticator, adminValidator, async (request, response) => {
        try {
            await removeAllSchedule();
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