const {
  getAllUser,
  createNewUser,
  getUserById,
  updateUser,
  deleteUser,
} = require("../../models/users/users.model");
const validateUser = require("./users.validate");

async function httpGetAllUser(req, res) {
  const allUsers = await getAllUser();

  res.status(200).json(allUsers);
}

async function httpCreateNewUser(req, res) {
  const { password } = req.body;

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

async function httpUpdateUser(req, res) {
  const { id } = req.params;
  const user = await getUserById(id);
  const updateCreds = req.body;
  // console.log(user);

  if (!user) {
    return res.status(404).json({
      error: {
        message: "No user found with the given id",
      },
    });
  }

  const {
    userName,
    password,
    email,
    isGold,
    remainingQuota,
    resetQuotaTime,
    createdAt,
  } = user;

  const userUpdateCreds = {
    userName,
    password,
    email,
    isGold,
    remainingQuota,
    resetQuotaTime,
    createdAt,
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
    return res.status(404).json({
      error: {
        message: "No user found with the given id",
      },
    });
  }

  const deletedUser = await deleteUser(id);

  return res.status(200).json(deletedUser);
}

module.exports = {
  httpGetAllUser,
  httpCreateNewUser,
  httpUpdateUser,
  httpDeleteUser,
};
