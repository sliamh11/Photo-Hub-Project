const express = require('express');
const configService = require('../services/configService');
const router = express.Router();
const validateConfig = require('../helpers/validation/configValidation');


router.get("/views", async (req, res) => {
    try {
        res.send(await configService.getViewsListAsync());
    } catch (error) {
        res.statusMessage = `${error.message}`;
        res.status(400).end();
    }
});

router.post('/', async (req, res) => {
    try {
        const { error } = validateConfig(req.body);
        if (error) {
            res.statusMessage = `${error.details[0].message}`;
            return res.status(400).end();
        }
        await configService.initConfigFiles();
        res.send(await configService.setConfigFile(req.body));

    } catch (error) {
        res.statusMessage = `${error.message}`;
        res.status(400).end();
    }
});

router.get('/is-data-exists', async (req, res) => {
    try {
        res.send(await configService.isConfigDataExists());
    } catch (error) {
        res.statusMessage = `${error.message}`;
        res.status(400).end();
    }
});

router.get("/categories", async (req, res) => {
    try {
        res.send(await configService.getCategoriesAsync());
    } catch (error) {
        res.statusMessage = `${error.message}`;
        res.status(400).end();
    }
});

module.exports = router;