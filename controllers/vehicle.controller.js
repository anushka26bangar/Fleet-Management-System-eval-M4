const supabase = require("../config/supabase");

exports.addVehicle = async (req, res) => {
  try {
    const { owner_id, ...vehicle } = req.body;

    const { data: owner } = await supabase
      .from("users")
      .select("role")
      .eq("id", owner_id)
      .single();

    if (owner.role !== "owner") {
      return res.status(403).json({ message: "Only owners allowed" });
    }

    const { data, error } = await supabase
      .from("vehicles")
      .insert([{ ...vehicle, owner_id }]);

    if (error) throw error;

    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.assignDriver = async (req, res) => {
  const { driver_id } = req.body;
  const { vehicleId } = req.params;

  const { data, error } = await supabase
    .from("vehicles")
    .update({ driver_id })
    .eq("id", vehicleId);

  if (error) return res.status(500).json(error);
  res.json({ message: "Driver assigned", data });
};

exports.getVehicle = async (req, res) => {
  const { vehicleId } = req.params;

  const { data } = await supabase
    .from("vehicles")
    .select("*")
    .eq("id", vehicleId)
    .single();

  res.json(data);
};
