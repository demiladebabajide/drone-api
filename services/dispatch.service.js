const Drone = require("../models/drone.model");
const Medication = require("../models/medication.model");

const loadDrone = async (serial, medicationData) => {
    try {
        const drone = await Drone.findOne({ serial }).populate("medications");
        if (!drone) {
            throw new Error("Drone not found");
        }
        const weight  = medicationData.weight;
        const totalWeight = drone.medications.reduce((acc, medication) => acc + medication.weight, 0) + Number(weight);
        if (totalWeight > drone.weight) {
            console.error(`Drone ${drone.serial} capacity exceeded!`);
            throw new Error("Drone capacity exceeded!");
        }

        if (drone.state !== "IDLE" && drone.state !== "LOADING") {
            console.error("Drone is currently unavailable");
            throw new Error("Drone is currently unavailable");
        }

        if (drone.batteryCapacity < 25) {
            console.error("Drone battery is too low");
            throw new Error("Drone battery is too low");
        }

        const medication = await Medication.create(medicationData);
        drone.medications.push(medication._id);
        drone.state = "LOADING";
        if (totalWeight === drone.weight) {
            drone.state = "LOADED";
            console.log(`\n----------------------Drone ${serial} fully loaded...Reducing drone battery levels by 1% every second----------------------`);
        }
        await drone.save(); 
        
        return drone;
    } catch (error) {
        console.error("Error loading drone:", error);
        return new Error(`Error loading drone: ${error.message}`);
    }
};

const getMedications = async (serial) => {
    try {
        const drone = await Drone.findOne({ serial }).populate("medications");
        if (!drone) {
            throw new Error("Drone not found");
        }
        return drone.medications;
    } catch (error) {
        console.error("Error fetching medications:", error);
        throw new Error(`Error fetching medications: ${error.message}`);
    }
};

module.exports = {
    loadDrone,
    getMedications,
};