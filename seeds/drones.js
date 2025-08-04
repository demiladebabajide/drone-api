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
        batteryCapacity: 80,
    },
    {
        serial: "003",
        model: "Heavyweight",
        weight: 480,
        batteryCapacity: 50,
    }
];

async function seedDrones() {
    const Drone = require("../models/drone.model");
    try {
        await Drone.deleteMany({}); // Clear existing drones
        await Drone.insertMany(drones);
        console.log("\n----------------------Drones seeded successfully----------------------");
    } catch (error) {
        console.error("Error seeding drones:", error);
    }
}

module.exports = seedDrones;