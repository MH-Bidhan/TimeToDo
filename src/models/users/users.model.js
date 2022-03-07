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

async function createNewUser(user) {
  const password = await hashPassword(user.password);
  try {
    const createdUser = await users.create({ ...user, password });
    return createdUser;
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = {
  getAllUser,
  createNewUser,
};
