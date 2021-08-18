const express = require('express');
const router = express.Router();
const configService = require('../services/configService');
const photosService = require('../services/photosService');

// Initializations
configService.initSystemFiles();
photosService.initPhotosFile();


module.exports = router;