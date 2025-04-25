const db = require("../db");

// GET all users
exports.getAllUsers = (req, res) => {
    db.query("SELECT * FROM users", (err, results) => {
      if (err) {
        console.error("Error fetching users: ", err);
        return res.status(500).json({ message: "Failed to fetch users", error: err });
      }
      res.json(results);
    });
  };
  
// GET user by ID
exports.getUserById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM users WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results[0]);
  });
};

// CREATE user
exports.createUser = (req, res) => {
    const { name, email } = req.body;
    db.query("INSERT INTO users (name, email) VALUES (?, ?)", [name, email], (err, result) => {
      if (err) {
        console.error("Error creating user: ", err);
        return res.status(500).json({ message: "Failed to create user", error: err });
      }
      res.json({ id: result.insertId, name, email });
    });
  };

// UPDATE user
// UPDATE user
exports.updateUser = (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    db.query("SELECT * FROM users WHERE id = ?", [id], (err, results) => {
      if (err) return res.status(500).json(err);
      if (results.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      db.query("UPDATE users SET name = ?, email = ? WHERE id = ?", [name, email, id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ id, name, email });
      });
    });
  };
  
  // DELETE user
  exports.deleteUser = (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM users WHERE id = ?", [id], (err, results) => {
      if (err) return res.status(500).json(err);
      if (results.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      db.query("DELETE FROM users WHERE id = ?", [id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "User deleted" });
      });
    });
  };
  
