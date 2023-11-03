const jwt = require("jsonwebtoken");

const sign = (type, payload) => {
  return jwt.sign(payload, process.env.JWT_KEY, {
    expiresIn: type === "access" ? "2 hours" : "24 hours",
  });
};

const verify = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_KEY);
  } catch (e) {
    console.error(e);
    return false;
  }
};

module.exports = { sign, verify };
