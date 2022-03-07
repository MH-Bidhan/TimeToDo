const { getAllUser, createNewUser } = require("../../models/users/users.model");
const { hashPassword } = require("../../services/bcrypt");
const validateUser = require("./users.validate");

async function httpGetAllUser(req, res) {
  const allUsers = await getAllUser();

  res.status(200).json(allUsers);
}

async function httpCreateNewUser(req, res) {
  const password = String(req.body.password);
  const userCred = {
    ...req.body,
    password,
    isGold: false,
    createdAt: Date.now(),
    resetQuotaTime: Date.now() + 10000,
  };

  const { error } = validateUser(userCred);

  if (error) {
    return res.status(400).json(error.message);
  }

  const createdUser = await createNewUser(userCred);

  return res.status(201).json(createdUser);
}

module.exports = {
  httpGetAllUser,
  httpCreateNewUser,
};
