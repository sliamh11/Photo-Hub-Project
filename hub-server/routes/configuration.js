const express = require('express');
const configService = require('../services/configService');
const router = express.Router();
const validateConfig = require('../helpers/validation/configValidation');

// Get views list
router.get("/views", async (req, res) => {
    try {
        res.send(await configService.getViewsList());
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Get the selected view from the config file.
router.get("/views/selected-view", async (req, res) => {
    try {
        res.send(await configService.getSelectedView());
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Post config data to config file.
router.post('/', async (req, res) => {
    try {
        // Validate config data with 'Joi' validation form.
        const { error } = validateConfig(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        await configService.initConfigFiles();
        res.send(await configService.setConfigFileData(req.body));

    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Check if data exists in config file
router.get('/is-data-exists', async (req, res) => {
    try {
        res.send(await configService.isConfigDataExists());
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Get categories list
router.get("/categories", async (req, res) => {
    try {
        res.send(await configService.getCategories());
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Post new categories list
router.post("/categories", async (req, res) => {
    try {
        // req.body === updated categories list
        res.send(await configService.postCategories(req.body));
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Get indication about whether the PrivateMode is enabled in config file.
router.get("/private-mode", async (req, res) => {
    try {
        res.send(await configService.isPrivateEnabled());
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Post client input password and match it between the saved one in the config file.
router.post("/match-passwords", async (req, res) => {
    try {
        const { password } = req.body;
        res.send(await configService.checkPasswordsMatch(password));
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Check if camera allowed in config file.
router.get("/camera-allowed", async (req, res) => {
    try {
        res.send(await configService.isCameraAllowed());
    } catch (error) {
        res.status(400).send(error.message)
    }
});

// Check if location allowed in config file.
router.get("/location-allowed", async (req, res) => {
    try {
        res.send(await configService.isLocationAllowed());
    } catch (error) {
        res.status(400).send(error.message)
    }
});

module.exports = router;