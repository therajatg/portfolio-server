require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const { blogsRouter } = require("./routers/blogsRouter");
const { commentsRouter } = require("./routers/commentsRouter");
const { authRouter } = require("./routers/authRouter");
const cors = require("cors");
const { verify, sign } = require("./utils/jwtservice");
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());

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

app.get("/api/refresh", (req, res) => {
  try {
    const refreshTokenVerified = verify(req.refreshToken);
    if (refreshTokenVerified) {
      const accessToken = sign({
        name: refreshTokenVerified.name,
        email: refreshTokenVerified.email,
      });
      res.status(200).json({ accessToken, name: refreshTokenVerified.name });
    } else {
      //   res.status(403).send("Token not valid");
      res.end();
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

app.listen(5000, () => console.log("Server Started"));
