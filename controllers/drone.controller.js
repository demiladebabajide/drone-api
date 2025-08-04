const droneService = require("../services/drone.service");

const createDrone = async (req, res) => {
    try {
        const droneData = req.body;
        const drone = await droneService.createDrone(droneData);
        if (drone instanceof Error) {
            return res.status(400).json({ message: drone.message });
        }
        res.status(201).json({ message: "Drone created successfully", drone });
    } catch (error) {
        res.status(500).json({ message: "Error creating drone", error: error.message });
    }
};

module.exports = {
    createDrone,
};