const express = require('express');
const servicesAuthenticator = require('../../../middlewares/servicesAuthenticator');
const updateCode = require('../business/updateCode');

const router = express.Router();

router.put('/', servicesAuthenticator, async (request, response) => {
        try {
            const code = await updateCode(request.body, request.user.id);
            response
                .status(200)
                .json(code);
        } catch (error) {
            response
                .status(400)
                .json(error);
        }
    }
);

module.exports = router;