const { verify } = require("../utils/jwtservice");

export const gatedAccess = (req, res, next) => {
  const jwtCookie = req.cookies.jwt;
  const payload = verify(jwtCookie);
  if (payload) {
    req.jwt = payload;
    next();
  } else {
    res.redirect("/");
  }
};
