const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config");

const {
  createNewUser,
  getUserById,
  updateUser,
  deleteUser,
  getUserByEmail,
  changePassword,
} = require("../../models/users/users.model");
const { hashPassword, verifyPassword } = require("../../services/bcrypt");
const errorMessage = require("../../services/error-messages");
const validateUser = require("./users.validate");

async function httpGetSpecificUser(req, res) {
  const token = req.header("x-auth-token");

  try {
    const { id } = jwt.verify(token, JWT_SECRET);

    const user = await getUserById(id);

    return res.status(200).json(user);
  } catch (err) {
    console.log(err.message);
  }
}

async function httpCreateNewUser(req, res) {
  const { email } = req.body;

  const user = await getUserByEmail(email);
  if (user) {
    return res.status(400).json(errorMessage.emailAlreadyInUse);
  }

  const userCred = {
    ...req.body,
    darkTheme: false,
    isGold: false,
    createdAt: Date.now(),
    resetQuotaTime: Date.now() + 10000,
  };

  const { error } = validateUser(userCred);

  if (error) {
    return res.status(400).json(error.message);
  }

  try {
    const createdUser = await createNewUser(userCred);

    return res.status(201).json(createdUser);
  } catch (err) {
    console.log(err);
  }
}

async function httpUpdateUser(req, res) {
  const { id } = req.params;
  const user = await getUserById(id);
  const updateCreds = req.body;

  if (updateCreds.password) {
    return res.status(400).json(errorMessage.passwordRequest);
  }

  if (!user) {
    return res.status(404).json(errorMessage.userNotFound);
  }

  const {
    userName,
    password,
    email,
    isGold,
    remainingQuota,
    resetQuotaTime,
    createdAt,
    avatar,
  } = user;

  const userUpdateCreds = {
    userName,
    password,
    email,
    isGold,
    remainingQuota,
    resetQuotaTime,
    createdAt,
    avatar,
    ...updateCreds,
  };

  const { error } = validateUser(userUpdateCreds);

  if (error) {
    return res.status(400).json(error.message);
  }

  const updatedUser = await updateUser(id, userUpdateCreds);

  return res.status(200).json(updatedUser);
}

async function httpDeleteUser(req, res) {
  const { id } = req.params;

  const user = await getUserById(id);

  if (!user) {
    return res.status(404).json(errorMessage.userNotFound);
  }

  const deletedUser = await deleteUser(id);

  return res.status(200).json(deletedUser);
}

async function httpChangePassword(req, res) {
  const { oldPassword, newPassword, confirmPassword } = req.body;

  const { id } = req.params;

  const user = await getUserById(id);

  if (!user) {
    return res.status(400).json(errorMessage.userNotFound);
  }

  if (newPassword !== confirmPassword) {
    return res
      .status(400)
      .json("New password and confirm password does not match");
  }

  const oldPasswordMatch = await verifyPassword(oldPassword, user.password);
  if (!oldPasswordMatch) {
    return res.status(400).json("Password is not valid");
  }

  const passwordChanged = await changePassword(id, newPassword);

  res.status(200).json(passwordChanged);
}

module.exports = {
  httpGetSpecificUser,
  httpCreateNewUser,
  httpUpdateUser,
  httpDeleteUser,
  httpChangePassword,
};
