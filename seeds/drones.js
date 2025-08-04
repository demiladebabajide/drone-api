const Drone = require("../models/drone.model");
const dispatchService = require("../services/dispatch.service");
const drones = [
    {
        serial: "001",
        model: "Cruiserweight",
        weight: 350,
        batteryCapacity: 100,
    },
    {
        serial: "002",
        model: "Lightweight",
        weight: 120,
        batteryCapacity: 65,
    },
    {
        serial: "003",
        model: "Heavyweight",
        weight: 480,
        batteryCapacity: 10,
    }
];

const medication1 = {
    name: "Panadol_Xtra",
    weight: 200,
    code: "PX_001",
    image: "panadol.jpg",
};

const medication2 = {
    name: "Cocodamol",
    weight: 100,
    code: "CO_002",
    image: "cocodamol.jpg",
};

async function seedDrones() {
    try {
        await Drone.deleteMany({}); // Clear existing drones
        await Drone.insertMany(drones);
        await dispatchService.loadDrone("001", medication1);
        await dispatchService.loadDrone("002", medication2);
        console.log("\n----------------------Drones seeded successfully----------------------");
        console.log(JSON.stringify(await Drone.find()));
    } catch (error) {
        console.error("Error seeding drones:", error);
    }
}

module.exports = seedDrones;