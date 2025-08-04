const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const droneSchema = new Schema(
    {
        serial: {
            type: String,
            required: true,
            unique: true,
            maxlength: 100,
        },
        model: {
            type: String,
            enum: ["Lightweight", "Middleweight", "Cruiserweight", "Heavyweight"],
            required: true,
        },
        weight: {
            type: Number,
            required: true,
            min: 0,
            max: 500,
        },
        batteryCapacity: {
            type: Number,
            required: true, 
            min: 0,
            max: 100,
        },
        state: {
            type: String,
            enum: ["IDLE", "LOADING", "LOADED", "DELIVERING", "DELIVERED", "RETURNING"],
            default: "IDLE",
        },
        medications: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Medication",
        }],
    },
    {
        toJSON: {
            transform: (doc, ret) => {
                delete ret._id;
                delete ret.__v;
            }
        }
    },
    {
        timestamps: true,
    },


);

module.exports = mongoose.model("Drone", droneSchema);