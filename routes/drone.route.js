const express = require("express");
const { validateDroneRequest } = require("../util/validation");

const {
  registerDrone,
  getAllDrones,
  getDroneBySerial,
  checkBatteryLevel,
} = require("../controllers/drone.controller");

const router = express.Router();

router.post("/drones", validateDroneRequest, registerDrone);
router.get("/drones", getAllDrones);
router.get("/drones/:serial", getDroneBySerial);
router.get("/drones/:serial/battery", checkBatteryLevel);

module.exports = router;