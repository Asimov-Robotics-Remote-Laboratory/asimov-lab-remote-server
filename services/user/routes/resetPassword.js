const express = require('express');
const resetPassword = require('../business/resetPassword');
const router = express.Router();
const {check, validationResult} = require('express-validator');

const validations = [
    check('email').isEmail()
];
router.put('/reset-password', validations, async (request, response) => {
    const data = request.body;
    try {
        const error = validationResult(request);
        if (!error.isEmpty()) {
            throw error
        }
        await resetPassword(data);
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