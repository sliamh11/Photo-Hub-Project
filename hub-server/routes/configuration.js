const express = require('express');
const configService = require('../services/configService');
const router = express.Router();
const validateConfig = require('../helpers/validation/configValidation');


router.get("/views", async (req, res) => {
    try {
        res.send(await configService.getViewsListAsync());
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.post('/', async (req, res) => {
    try {
        const { error } = validateConfig(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        await configService.initConfigFiles();
        res.send(await configService.setConfigFile(req.body));

    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get('/is-data-exists', async (req, res) => {
    try {
        res.send(await configService.isConfigDataExists());
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get("/categories", async (req, res) => {
    try {
        res.send(await configService.getCategoriesAsync());
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;