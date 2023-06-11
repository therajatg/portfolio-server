require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const { blogsRouter } = require("./routers/blogsRouter");
const { commentsRouter } = require("./routers/commentsRouter");
const { authRouter } = require("./routers/authRouter");

const cors = require("cors");
const { verify } = require("./utils/jwtservice");
const app = express();

app.use(cookieParser());
app.use(cors({ origin: "*" }));
app.use(express.json());

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
// app.get("/", (req, res) => {
//   //   localStorage.setItem("anytuh", 11111);
//   res.cookie("name", "efnsenfklsn", { httpOnly: true }).send("cookie set");
// });
app.use("/api/blogs", blogsRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/auth", authRouter);

app.listen(5000, "192.168.29.12", () => console.log("Server Started"));
