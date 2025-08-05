const express = require("express");
const upload = require("../config/multer");

const {
  loadDrone,
  getDroneMedications
} = require("../controllers/dispatch.controller");

const router = express.Router();

router.post("/drones/:serial/load", upload.single("image"), loadDrone);
router.get("/drones/:serial/medications", getDroneMedications);

module.exports = router;