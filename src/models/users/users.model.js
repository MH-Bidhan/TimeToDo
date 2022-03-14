const { hashPassword } = require("../../services/bcrypt");
const users = require("./users.mongo");

async function getAllUser() {
  const allUsers = await users.find(
    {},
    {
      password: 0,
      createdAt: 0,
      resetQuotaTime: 0,
    }
  );

  return allUsers;
}

async function getUserById(userId) {
  try {
    return await users.findById(userId);
  } catch (err) {
    return err;
  }
}

async function getUserByEmail(email) {
  try {
    return await users.findOne({ email });
  } catch (err) {
    return err;
  }
}

async function createNewUser(user) {
  const password = await hashPassword(user.password);
  try {
    const createdUser = await users.create({ ...user, password });
    return createdUser;
  } catch (err) {
    console.log(err.message);
  }
}

async function updateUser(userId, updatedUserCred) {
  try {
    const user = await users.findByIdAndUpdate(userId, updatedUserCred);
    if (user) {
      const updatedUser = await getUserById(userId);
      return updatedUser;
    }
  } catch (err) {
    console.log(err.message);
  }
}

async function deleteUser(userId) {
  const deletedUser = users.findByIdAndDelete(userId);

  return deletedUser;
}

module.exports = {
  getAllUser,
  getUserById,
  getUserByEmail,
  createNewUser,
  updateUser,
  deleteUser,
};
