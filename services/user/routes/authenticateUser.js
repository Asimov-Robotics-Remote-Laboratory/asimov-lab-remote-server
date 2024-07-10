const express = require('express');
const authenticateUser = require('../business/authenticateUser');
const router = express.Router();
const {check, validationResult} = require('express-validator');

const validations = [
    check('email').isEmail(),
    check('password').isLength({min: 6})
];

router.post('/authenticate', validations, async (request, response) => {
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            throw errors
        }
        const credentials = await authenticateUser(request.body);
        response
            .status(200)
            .json(credentials);
    } catch (error) {
        response
            .status(400)
            .json(error);
    }
});

module.exports = router;