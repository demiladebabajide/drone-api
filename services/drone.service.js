const Drone = require("../models/drone.model");

const createDrone = async (droneData) => {
    try {
        const { serial, model, weight, batteryCapacity } = droneData;
        const existingDrone = await Drone.findOne({ serial });
        if (existingDrone) {
            throw new Error("Drone with this serial already exists");
        }
        const drone = await Drone.create({
            serial,
            model,
            weight,
            batteryCapacity,
        });
        return drone;
    } catch (error) {
        console.error("Error creating drone:", error);
        return new Error(`Error creating drone: ${error}`);
    }
};

module.exports = {
    createDrone,
};