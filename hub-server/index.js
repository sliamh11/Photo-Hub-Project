// General requires.
const express = require('express');
const config = require('./config');
const cors = require('cors');
const app = express();

// Routes & MW requires.
const configRoute = require('./routes/configuration');
const photosRoute = require('./routes/photos');
const init = require('./middlewares/init');

// Middlewares
app.use(cors());
app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({limit: '10mb', extended: true}));
app.use(init);

// Routes
app.use("/api/config", configRoute);
app.use("/api/photos", photosRoute);


app.listen(config.PORT, () => {
    console.log("Server is up.");
});