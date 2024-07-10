const express = require('express');
const redefinePassword = require('../business/redefinePassword');
const router = express.Router();
const servicesAuthenticator = require('../../../middlewares/servicesAuthenticator');
const {check, validationResult} = require('express-validator');

const validations = [
    check('password').isLength({min: 6})
];
router.put('/redefine-password', validations, servicesAuthenticator, async (request, response) => {
    const data = request.body;
    try {
        const error = validationResult(request);
        if (!error.isEmpty()) {
            throw error
        }

        await redefinePassword(request.body, request.user.id);
        response
            .status(200)
            .send();
    } catch (error) {
        response
            .status(400)
            .json(error);
    }
});

module.exports = router;