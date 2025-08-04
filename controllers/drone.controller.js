const Drone = require("../models/drone.model");

const createDrone = async (req, res) => {
    try {
        const droneData = req.body;
        const drone = await Drone.create(droneData);
        await drone.save();
        res.status(201).json({ message: "Drone created successfully", drone });
    } catch (error) {
        res.status(500).json({ message: "Error creating drone", error: error.message });
    }
};

module.exports = {
    createDrone,
};