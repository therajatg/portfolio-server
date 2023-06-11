// import { verify } from "../utils/jwtService";
const { verify } = require("../utils/jwtservice");

export const passiveAuth = (req, res, next) => {
  const jwtCookie = req.cookies.jwt;

  const payload = verify(jwtCookie);

  if (payload) {
    req.jwt = payload;
  }

  next();
};
