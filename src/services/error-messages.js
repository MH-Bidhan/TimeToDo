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
  loginError: {
    error: {
      message: "Invalid email or password",
    },
  },
  authError: {
    error: {
      message: "User must be authenticated",
    },
  },
  passwordRequest: {
    error: {
      message: "Password change request must be sent separetly",
    },
  },
  emailAlreadyInUse: {
    error: {
      message: "This email is already in use",
    },
  },
  accessDenied: {
    error: {
      message: "Access denied",
    },
  },
};

module.exports = errorMessage;
