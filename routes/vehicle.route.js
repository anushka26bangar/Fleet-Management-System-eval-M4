const router = require("express").Router();
const limiter = require("../middlewares/rateLimiter");
const controller = require("../controllers/vehicle.controller");

router.post("/add", limiter, controller.addVehicle);
router.patch("/assign-driver/:vehicleId", controller.assignDriver);
router.get("/:vehicleId", controller.getVehicle);

module.exports = router;
