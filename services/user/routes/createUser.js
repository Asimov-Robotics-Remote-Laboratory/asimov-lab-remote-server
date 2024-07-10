const express = require('express');
const createUser = require('../business/createUser');
const router = express.Router();
const {check, validationResult} = require('express-validator');

const validations = [
    check('email').isEmail(),
    check('password').isLength({min: 6})
];

router.post('/', validations, async (request, response) => {
    const data = request.body;
    try {
        const error = validationResult(request);
        if (!error.isEmpty()) {
            throw error
        }
        await createUser(data);
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