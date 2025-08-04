const express = require("express");
const { validateDroneRequest } = require("../util/validation");

const {
  registerDrone,
  getAllDrones,
  getDroneBySerial,
  checkBatteryLevel,
  rechargeDrone,
} = require("../controllers/drone.controller");

const router = express.Router();

router.post("/drones", validateDroneRequest, registerDrone);
router.get("/drones", getAllDrones);
router.get("/drones/:serial", getDroneBySerial);
router.get("/drones/:serial/battery", checkBatteryLevel);
router.post("/drones/:serial/recharge", rechargeDrone);

module.exports = router;