const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

function getAuthToken(payload) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "24h",
  });
}

function verifyAuthToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getAuthToken,
  verifyAuthToken,
};
