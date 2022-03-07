const bcrypt = require("bcrypt");

async function hashPassword(password) {
  const salt = await bcrypt.genSalt();

  const hashedPassword = await bcrypt.hash(String(password), salt);

  return hashedPassword;
}

async function verifyPassword(password) {
  const verifiedPassword = await bcrypt.compare(password);

  return verifiedPassword;
}

module.exports = {
  hashPassword,
  verifyPassword,
};
