const supabase = require("../config/supabase");

exports.createTrip = async (req, res) => {
  const { vehicle_id, passengers } = req.body;

  const { data: vehicle } = await supabase
    .from("vehicles")
    .select("*")
    .eq("id", vehicle_id)
    .single();

  if (!vehicle.isAvailable)
    return res.status(400).json({ message: "Vehicle not available" });

  if (passengers > vehicle.allowed_passengers)
    return res.status(400).json({ message: "Passenger limit exceeded" });

  await supabase.from("vehicles").update({ isAvailable: false }).eq("id", vehicle_id);

  const { data } = await supabase.from("trips").insert([req.body]);
  res.status(201).json(data);
};

exports.endTrip = async (req, res) => {
  const { tripId } = req.params;

  const { data: trip } = await supabase
    .from("trips")
    .select("*, vehicles(rate_per_km)")
    .eq("id", tripId)
    .single();

  const cost = trip.distance_km * trip.vehicles.rate_per_km;

  await supabase
    .from("trips")
    .update({ isCompleted: true, tripCost: cost })
    .eq("id", tripId);

  await supabase
    .from("vehicles")
    .update({ isAvailable: true })
    .eq("id", trip.vehicle_id);

  res.json({ message: "Trip ended", cost });
};
