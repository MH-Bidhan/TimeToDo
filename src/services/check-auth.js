const errorMessage = require("./error-messages");
const { verifyAuthToken } = require("./jwt");

async function checkAuth(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(403).json(errorMessage.authError);
  }

  const isValidToken = await verifyAuthToken(token);

  if (!isValidToken) {
    return res.status(403).json(errorMessage.authError);
  }

  next();
}

module.exports = {
  checkAuth,
};
