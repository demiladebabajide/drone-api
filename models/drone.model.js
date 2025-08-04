const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const droneSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        model: {
            type: String,
            required: true,
        },
        weight: {
            type: Number,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Drone", droneSchema);