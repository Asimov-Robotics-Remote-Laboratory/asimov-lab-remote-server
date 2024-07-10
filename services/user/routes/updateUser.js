const express = require('express');
const router = express.Router();
const servicesAuthenticator = require('../../../middlewares/servicesAuthenticator');
const updateUser = require('../business/updateUser');
const {check, validationResult} = require("express-validator");
const role = require('../enums/role');

const validations = [
    check('email').isEmail()
];
router.put('/', servicesAuthenticator, validations, async (request, response) => {
    try {

        if(request.user.role === role.ADMINISTRATOR){
            validations.push(check('password').isLength({min: 6}));
        }
        const error = validationResult(request);
        if (!error.isEmpty()) {
            throw error
        }
        const user = await updateUser(request.user,request.body);
        return response
            .status(200)
            .json(user);
    } catch (error) {
        response
            .status(404)
            .json(error);
    }
});

module.exports = router;