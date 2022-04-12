const { updateUser } = require("../models/users/users.model");

async function checkUserStatus(user) {
  const { _id, resetQuotaTime } = user;

  const currentTime = Date.now();
  const resetTime = new Date(resetQuotaTime).getTime();

  if (resetTime > currentTime) return;

  const oneWeek = 604800000;
  const newResetTime = resetTime + oneWeek;
  return await updateUser(_id, {
    remainingQuota: 50,
    resetQuotaTime: new Date(newResetTime).toISOString(),
  });
}

module.exports = checkUserStatus;
