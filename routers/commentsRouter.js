const express = require("express");
const pool = require("../db/db");
const commentsRouter = express.Router();

commentsRouter.get("/:id", async (req, res) => {
  try {
    const commentsRelatedToTheBlog = await pool.query(
      "SELECT content FROM comment WHERE blog_id = $1",
      [req.params.id]
    );
    res.status(200).json(commentsRelatedToTheBlog.rows);
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
});

module.exports = { commentsRouter };
