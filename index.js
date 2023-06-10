const express = require("express");
const cookieParser = require("cookie-parser");
const { blogsRouter } = require("./routers/blogsRouter");
const { commentsRouter } = require("./routers/commentsRouter");

const cors = require("cors");
// const { verify } = require("./utils/jwtservice");
const app = express();
app.use(cookieParser());

// app.use((req, res, next) => {
//   const jwtCookie = req.cookies.jwt;
//   const payload = verify(jwtCookie);
//   if (payload) {
//     req.jwt = payload;
//     next();
//   } else {
//     res.redirect("/");
//   }
// });
app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogsRouter);
app.use("/api/comments", commentsRouter);

app.listen("5000", () => console.log("Server Started"));
