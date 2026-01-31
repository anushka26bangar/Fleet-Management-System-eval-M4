require("dotenv").config();
const express = require("express");
const logger = require("./middlewares/logger");

const app = express();
app.use(express.json());
app.use(logger);

app.use("/users", require("./routes/user.routes"));
app.use("/vehicles", require("./routes/vehicle.routes"));
app.use("/trips", require("./routes/trip.routes"));
app.use("/analytics", require("./controllers/analytics.controller"));

app.use((req, res) => {
  res.status(404).json({ message: "This Request Is Not Found" });
});

app.listen(process.env.PORT, () =>
  console.log("Server running")
);
