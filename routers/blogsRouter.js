const express = require("express");
const pool = require("../db/db");
const blogsRouter = express.Router();

blogsRouter.get("/:id", async (req, res) => {
  try {
    const blog = await pool.query("SELECT content FROM blog WHERE id = $1", [
      parseInt(req.params.id),
    ]);
    res.status(200).json(blog.rows[0]);
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
});

blogsRouter.get("/", async (req, res) => {
  try {
    const allBlogs = await pool.query("SELECT * FROM blog");
    res.status(200).json(allBlogs.rows);
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
});

module.exports = { blogsRouter };
