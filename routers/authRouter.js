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
    const accessToken = sign("access", {
      name,
      email,
    });
    const refreshToken = sign("refresh", { name, email });
    res.cookie("jwt", refreshToken, { httpOnly: true });
    res.status(200).json({ accessToken, name });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  if (user.rowCount) {
    const isPasswordValid = compareHash(password, user.rows[0].password);
    if (isPasswordValid) {
      // Issue token
      const accessToken = sign("access", {
        name: user.rows[0].name,
        email: user.rows[0].email,
      });
      const refreshToken = sign("refresh", {
        name: user.rows[0].name,
        email: user.rows[0].email,
      });
      res.cookie("jwt", refreshToken, { httpOnly: true });
      res.status(200).json({ accessToken, name: user.rows[0].name });
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
