const express = require("express");

const {
  createDrone
} = require("../controllers/drone.controller");

const router = express.Router();

router.post("/drones", createDrone);

module.exports = router;