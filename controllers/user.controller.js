const supabase = require("../config/supabase");

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!["customer", "owner", "driver"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const { data, error } = await supabase
      .from("users")
      .insert([{ name, email, password, role }]);

    if (error) throw error;

    res.status(201).json({ message: "User created", data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
