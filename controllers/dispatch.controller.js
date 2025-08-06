const dispatchService = require("../services/dispatch.service");
require("dotenv").config();
const port = process.env.PORT;

const loadDrone = async (req, res) => {
    try {
        const { serial } = req.params;
        const { name, weight, code } = req.body;

        let image;
        if (req.file) {
            image = `http://localhost:${port}/${req.file.path}`;
        }
        const medication = {
            name,
            weight,
            code,
            image
        };

        const drone = await dispatchService.loadDrone(serial, medication);
        if (drone instanceof Error) {
            return res.status(400).json({ message: drone.message });
        }
        res.status(200).json({ message: `Drone ${serial} loaded successfully`, drone });
    } catch (error) {
        res.status(500).json({ message: "Error loading drone", error: error.message });
    }
};

const getDroneMedications = async (req, res) => {
    try {
        const { serial } = req.params;
        const medications = await dispatchService.getMedications(serial);
        if (medications instanceof Error) {
            return res.status(400).json({ message: medications.message });
        }
        res.status(200).json(medications);
    } catch (error) {
        res.status(500).json({ message: "Error fetching medications", error: error.message });
    }
};

module.exports = {
    loadDrone,
    getDroneMedications
};