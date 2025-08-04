const express = require("express");

const mongoose = require("mongoose");
const port = 8000;
const app = express();
const cors = require("cors");
const seedDrones = require("./seeds/drones");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect("mongodb://localhost:27017/drone-api", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("Connected to MongoDB successfully");
     app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);

        seedDrones();
        require("./jobs/droneBattery");
    });
})
.catch((err) => {
    console.error("Error connecting to MongoDB:", err);
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

module.exports = app;