const express = require('express');
const validatePhoto = require('../helpers/validation/photoValidation');
const photosService = require('../services/photosService');
const router = express.Router();

// Get all photos.
router.get("/", async (req, res) => {
    try {
        res.send(await photosService.getAllPhotos());
    } catch (error) {
        // console.log(`GetPhotos error: ${error}`);
        // res.statusMessage = `${error.message}`;
        res.sendStatus(400).send(error.message);
    }
});

// Add a new photo to the library.
router.post("/", async (req, res) => {
    try {
        const { error } = validatePhoto(req.body);
        if (error) { // Validation error.
            // res.statusMessage = `${error.details[0].message}`;
            return res.status(400).send(error.details[0].message);
        }

        if (await photosService.addNewPhoto(req.body)) {
            res.status(200).send(true);
        } else {
            // res.statusMessage = "File already exists";
            res.status(400).send("File already exists");
        }
    } catch (error) {
        console.log(`photos MW,post error: ${error}`);
        // res.statusMessage = `${error.message}`;
        res.sendStatus(400).send(error.message);
    }
});

module.exports = router;