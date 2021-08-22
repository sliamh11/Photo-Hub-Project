const express = require('express');
const validatePhoto = require('../helpers/validation/photoValidation');
const photosService = require('../services/photosService');
const router = express.Router();

// Get all photos.
router.get("/", async (req, res) => {
    try {
        res.send(await photosService.getAllPhotos());
    } catch (error) {
        res.sendStatus(400).send(error.message);
    }
});

// Add a new photo to the library.
router.post("/", async (req, res) => {
    try {
        const { error } = validatePhoto(req.body);
        // Validation error.
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        if (await photosService.addNewPhoto(req.body)) {
            return res.status(200).send(true);
        } else {
            return res.status(400).send("File already exists");
        }
    } catch (error) {
        console.log(`photos MW,post error: ${error}`);
        res.sendStatus(400).send(error.message);
    }
});

// Update a photo
router.put("/", async (req, res) => {
    try {
        const { updatedPhoto, fileName } = req.body;

        const { error } = validatePhoto(updatedPhoto);
        // Validation error.
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        
        const result = await photosService.updatePhoto(updatedPhoto, fileName);
        return res.send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;