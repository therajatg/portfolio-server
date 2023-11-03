const express = require("express");
const pool = require("../db/db");
const { verify } = require("jsonwebtoken");
const commentsRouter = express.Router();

commentsRouter.get("/:id", async (req, res) => {
  try {
    const commentsRelatedToTheBlog = await pool.query(
      "SELECT content, user_id FROM comment WHERE blog_id = $1",
      [req.params.id]
    );
    res.status(200).json(commentsRelatedToTheBlog.rows);
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
});

commentsRouter.post("/:id", async (req, res) => {
  const authHeader = req.headers["Authorization"];
  console.log("authH", req.headers["Authorization"]);
  // const token = authHeader && authHeader.split(" ")[1]; // Bearer Token

  // Option 2
  // const token = req.header("x-auth-token");
  // console.log(req.header("x-auth-token"));
  try {
    const refreshTokenVerified = verify(req.refreshToken);
    if (refreshTokenVerified) {
      // const newComment = await pool.query(
      //   "INSERT INTO comment (blog_id, user_id, content) VALUES ($1, $2, $3)"[
      //     (req.params.id, req.jwt.name, req.body.content)
      //   ]
      // );
      res.status(200).json(commentsRelatedToTheBlog.rows);
    }
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
});

module.exports = { commentsRouter };
