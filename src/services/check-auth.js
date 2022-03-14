const errorMessage = require("./error-messages");
const { verifyAuthToken } = require("./jwt");

function checkAuth(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(403).json(errorMessage.authError);
  }

  const isValidToken = verifyAuthToken(token);

  if (!isValidToken) {
    return res.status(403).json(errorMessage.authError);
  }

  next();
}

async function checkUserSpecificAuth(req, res, next) {
  const { id } = req.params;
  const { userId } = req.query;
  const token = req.header("x-auth-token");

  const isValidToken = verifyAuthToken(token);

  if (id) {
    if (isValidToken.id !== id) {
      return res.status(403).json(errorMessage.accessDenied);
    }
  }
  if (userId) {
    if (isValidToken.id !== userId) {
      return res.status(403).json(errorMessage.accessDenied);
    }
  }
  next();
}

module.exports = {
  checkAuth,
  checkUserSpecificAuth,
};
