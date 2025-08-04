const express = require("express");

const mongoose = require("mongoose");
const app = express();
app.use(express.urlencoded({ extended: true }));
mongoose.connect("mongodb://localhost:27017/drone-api", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("Connected to MongoDB successfully");
     app.listen(8000, () => {
        console.log(`Server is running on http://localhost:8000`);
    });
})
.catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});


app.get("/", (req, res) => {
  res.status(200).json({ alive: "True" });
});

module.exports = app;