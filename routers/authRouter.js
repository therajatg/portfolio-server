const express = require("express");
const pool = require("../db/db");
const { compareHash, hash } = require("../utils/hash");
const { sign } = require("../utils/jwtservice");
const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
      [name, email, hash(password)]
    );
    const token = sign({
      email: email,
    });
    console.log(token);
    res.cookie("jwt", "2231233", { httpOnly: true });
    // res.status(200).json({ message: "Successfully Registered" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await pool.query("SELECT FROM users WHERE email = $1", [email]);

  if (user) {
    const isPasswordValid = compareHash(password, user.rows[0].password);
    if (isPasswordValid) {
      // Issue token

      const token = sign({
        id: admin.id,
        email: admin.email,
      });

      res.cookie("jwt", token, { httpOnly: true });
      res.redirect("back");
    } else {
      res.status(400).send("Invalid User");
    }
  } else {
    res.status(400).send("Invalid User");
  }
});

authRouter.get("/logout", (req, res) => {
  res.clearCookie("jwt");
  res.redirect("/");
});

module.exports = { authRouter };
