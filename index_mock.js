const express = require("express");
require("dotenv").config({path: `.env_test`});

const mongoose = require("mongoose");
const app = express();
const MONGODB_URI = process.env.MONGODB_URI;
const port = process.env.PORT;
const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(MONGODB_URI)
    .then(() => {
            console.log("Connected to MongoDB for testing at ", MONGODB_URI);
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