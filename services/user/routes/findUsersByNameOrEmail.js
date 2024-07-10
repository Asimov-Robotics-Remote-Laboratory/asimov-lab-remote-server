const express = require('express');
const findUsersByNameOrEmail = require('../business/findUsersByNameOrEmail');
const router = express.Router();
const servicesAuthenticator = require('../../../middlewares/servicesAuthenticator');
const adminValidator = require('../../../middlewares/adminValidator');

router.get('/page/:page/quantityPerPage/:quantityPerPage/searchParam/:searchParam', servicesAuthenticator, adminValidator, async (request, response) => {
    try {
        const page = new Number(request.params.page);
        const quantityPerPage = new Number(request.params.quantityPerPage);
        const searchParam = request.params.searchParam;
        const data = await findUsersByNameOrEmail(page, quantityPerPage, searchParam);
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