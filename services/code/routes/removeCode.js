const express = require('express');
const servicesAuthenticator = require('../../../middlewares/servicesAuthenticator');
const removeCode = require('../business/removeCode');

const router = express.Router();

router.delete('/id/:id', servicesAuthenticator, async (request, response) => {
        try {
            await removeCode(request.params.id);
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