const express = require("express");
require("dotenv").config();

const mongoose = require("mongoose");
const port = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const app = express();
const cors = require("cors");
const seedDrones = require("./seeds/drones");
app.use(cors());
const logger = require("./util/logger");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        logger.info("Connected to MongoDB successfully");
        app.listen(port, () => {
            logger.info(`Server is running on http://localhost:${port}`);

            seedDrones();
            require("./jobs/droneBattery");
        });
    })
    .catch((err) => {
        logger.error("Error connecting to MongoDB:", err);
    });



app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/", (req, res) => {
    res.status(200).json({ alive: "True" });
});

app.use('/api', require('./routes/drone.route'));
app.use('/api', require('./routes/dispatch.route'));

app.use('/uploads', express.static('uploads'));

module.exports = app;