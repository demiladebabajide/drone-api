const express = require("express");
const { validateDroneRequest } = require("../util/validation");

const {
  createDrone
} = require("../controllers/drone.controller");

const router = express.Router();

router.post("/drones", validateDroneRequest, createDrone);

module.exports = router;