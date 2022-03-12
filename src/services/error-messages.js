const errorMessage = {
  noUserSpecified: {
    error: {
      message: "No user has been specified",
    },
  },
  eventTimeError: {
    error: {
      message: "Event time must be in the future",
    },
  },
  userNotFound: {
    error: {
      message: "No user found with the given id",
    },
  },
  missingQuota: {
    error: {
      message: "User does not possess enough quota to create an event ",
    },
  },
};

module.exports = errorMessage;
