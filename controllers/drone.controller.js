const droneService = require("../services/drone.service");

const registerDrone = async (req, res) => {
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

const getAllDrones = async (req, res) => {
    try {
        if (req.query.state) {
            const state = req.query.state.toUpperCase();
            if (state === "IDLE") {
                const drones = await droneService.getAvailableDrones();
                return res.status(200).json(drones);
            }
            return res.status(400).json({ message: "Invalid status query parameter" });
        }

        const drones = await droneService.getAllDrones();
        res.status(200).json(drones);
    } catch (error) {
        res.status(500).json({ message: "Error fetching drones", error: error.message });
    }
};

const getDroneBySerial = async (req, res) => {
    const { serial } = req.params;
    try {
        const drone = await droneService.findBySerial(serial);
        if (!drone) {
            return res.status(404).json({ message: "Drone not found" });
        }
        res.status(200).json(drone);
    } catch (error) {
        res.status(500).json({ message: "Error fetching drone", error: error.message });
    }
};

const checkBatteryLevel = async (req, res) => {
    const { serial } = req.params;
    try {
        const drone = await droneService.findBySerial(serial);
        if (!drone) {
            return res.status(404).json({ message: "Drone not found" });
        }
        res.status(200).json({ batteryLevel: drone.batteryCapacity });
    } catch (error) {
        res.status(500).json({ message: "Error fetching battery level", error: error.message });
    }
};

const rechargeDrone = async (req, res) => {
    const { serial } = req.params;
    try {
        const drone = await droneService.rechargeDrone(serial);
        res.status(200).json({ message: "Drone recharged successfully", drone });
    } catch (error) {
        res.status(500).json({ message: "Error recharging drone", error: error.message });
    }
};


module.exports = {
    registerDrone,
    getAllDrones,
    getDroneBySerial,
    checkBatteryLevel,
    rechargeDrone,
};