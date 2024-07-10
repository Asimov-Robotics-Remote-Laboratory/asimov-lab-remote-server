const express = require('express');
const listAllUsers = require('../business/listAllUsers');
const router = express.Router();
const servicesAuthenticator = require('../../../middlewares/servicesAuthenticator');
const adminValidator = require('../../../middlewares/adminValidator');

router.get('/page/:page/quantityPerPage/:quantityPerPage', servicesAuthenticator, adminValidator, async (request, response) => {
    try {
        const page = new Number(request.params.page);
        const quantityPerPage = new Number(request.params.quantityPerPage);
        const data = await listAllUsers(page, quantityPerPage);
        response
            .status(200)
            .json(data);
    } catch (error) {
        response
            .status(400)
            .json(error);
    }
});

module.exports = router;