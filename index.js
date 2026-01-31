const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());

const vehicleRoutes = require("./routes/vehicle.routes"); // no destructuring

app.use("/vehicles", vehicleRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
