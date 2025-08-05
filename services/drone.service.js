const Drone = require("../models/drone.model");
const logger = require("../util/logger");

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
        logger.error("Error creating drone:", error);
        return new Error(`Error creating drone: ${error}`);
    }
};

const getAllDrones = async () => {
    try {
        const drones = await Drone.find().sort({ serial: 1 }).populate("medications");
        return drones;
    } catch (error) {
        logger.error("Error fetching drones:", error);
        throw new Error(`Error fetching drones: ${error}`);
    }
};

const findBySerial = async (serial) => {
    try {
        const drone = await Drone.findOne({ serial }).populate("medications");
        return drone;
    } catch (error) {
        logger.error("Error fetching drone by serial:", error);
        throw new Error(`Error fetching drone by serial: ${error}`);
    }
};

const getAvailableDrones = async () => {
    try {
        const drones = await Drone.find({ state: "IDLE" }).sort({ serial: 1 });
        return drones;
    }
    catch (error) {
        logger.error("Error fetching available drones:", error);
        throw new Error(`Error fetching available drones: ${error}`);
    }
};


const checkDronesBatteryLevels = async () => {
    try {
        const drones = await getAllDrones();
        drones.forEach(drone => {
            if (drone.batteryCapacity <= 0) {
                logger.error(`Drone ${drone.serial} battery is empty. Recharging...`);
                drone.batteryCapacity = 100;
                drone.save();
            }
            else if (drone.batteryCapacity < 20) {
                logger.warn(`Drone ${drone.serial} has low battery: ${drone.batteryCapacity}%`);
            }
            else {
                logger.info(`Drone ${drone.serial} battery health: ${drone.batteryCapacity}%`);
            }
        });
    } catch (error) {
        logger.error("Error checking drones battery levels:", error);
    }
};

const reduceBatteryLevel = async () => {
    try {
        const drones = await getAllDrones();
        drones.forEach(async (drone) => {
            if (drone.state !== "IDLE") {
            drone.batteryCapacity = Math.max(0, drone.batteryCapacity - 1);
            await drone.save();
            return drone;
            }
        });
    } catch (error) {
        logger.error(error);
        throw new Error(`Error reducing drone battery level: ${error}`);
    }
};

const rechargeDrone = async (serial) => {
    try {
        const drone = await Drone.findOneAndUpdate(
            { serial },
            { batteryCapacity: 100 },
            { new: true }
        );
        if (!drone) {
            throw new Error("Drone not found");
        }
        return drone;
    } catch (error) {
        logger.error("Error charging drone battery:", error);
        throw new Error(`Error charging drone battery: ${error}`);
    }
};


module.exports = {
    createDrone,
    getAllDrones,
    findBySerial,
    getAvailableDrones,
    rechargeDrone,
    checkDronesBatteryLevels,
    reduceBatteryLevel,
};