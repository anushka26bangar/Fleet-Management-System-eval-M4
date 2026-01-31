const express = require("express");
const router = express.Router();

const {
  addVehicle,
  assignDriver,
  getVehicle,
} = require("../controllers/vehicle.controller");

router.post("/add", addVehicle);
router.post("/assign", assignDriver);
router.get("/", getVehicle);

module.exports = router;  
