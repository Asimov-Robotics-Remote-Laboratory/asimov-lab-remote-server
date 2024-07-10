const express = require('express');
const servicesAuthenticator = require('../../../middlewares/servicesAuthenticator');
const removeLaboratory = require('../business/removeLaboratory');
const adminValidator = require('../../../middlewares/adminValidator');

const router = express.Router();
router.delete('/id/:id', servicesAuthenticator, adminValidator, async (request, response) => {
        try {
            await removeLaboratory(request.params.id);
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