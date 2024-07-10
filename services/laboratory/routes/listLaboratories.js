const express = require('express');
const router = express.Router();
const servicesAuthenticator = require('../../../middlewares/servicesAuthenticator');
const listLaboratories = require('../business/listLaboratories');

router.get('/page/:page/quantityPerPage/:quantityPerPage', servicesAuthenticator, async (request, response) => {
    try {
        const page = new Number(request.params.page);
        const quantityPerPage = new Number(request.params.quantityPerPage);

        const laboratories = await listLaboratories(page, quantityPerPage);
        response
            .status(200)
            .send(laboratories)
    } catch (error) {
        response
            .status(400)
            .json(error)
    }
});

module.exports = router;