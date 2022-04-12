const { getUserByEmail } = require("../../models/users/users.model");
const { verifyPassword } = require("../../services/bcrypt");
const errorMessage = require("../../services/error-messages");
const { getAuthToken } = require("../../services/jwt");
const checkUserStatus = require("../../services/user-status");

async function loginUser(req, res) {
  const { email, password } = req.body;

  const user = await getUserByEmail(email);

  if (!user) {
    return res.status(404).json(errorMessage.loginError);
  }

  const isValid = await verifyPassword(password, user.password);

  if (!isValid) {
    return res.status(400).json(errorMessage.loginError);
  }

  await checkUserStatus(user);

  const userForToken = {
    id: user["_id"],
    name: user["name"],
    isGold: user["isGold"],
  };

  const token = getAuthToken(userForToken);

  res.status(200).json({ user: userForToken, token });
}

module.exports = {
  loginUser,
};
