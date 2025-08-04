const express = require("express");

const {
  loadDrone,
  getDroneMedications
} = require("../controllers/dispatch.controller");

const router = express.Router();

router.post("/drones/:serial/load", loadDrone);
router.get("/drones/:serial/medications", getDroneMedications);

module.exports = router;