const cron = require("node-cron");

const { reduceBatteryLevel, checkDronesBatteryLevels } = require("../services/drone.service");
const { EVERY_SECOND, EVERY_MINUTE } = require("../config/cronConfig");

console.log("\n----------------------Reducing drone battery levels by 1% every second----------------------");
cron.schedule(EVERY_SECOND, async () => {
    await reduceBatteryLevel();
});

cron.schedule(EVERY_MINUTE, async () => { //-----------
    console.log("\n----------------------Checking drones battery levels----------------------");
    await checkDronesBatteryLevels();
});

