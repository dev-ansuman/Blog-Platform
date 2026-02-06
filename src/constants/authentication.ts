const USERNAME = {
  ATLEAST: 'username should be atleast 3 characters!',
  ATMOST: 'username should be atmost 10 characters!',
  CREATED: 'User created successfully',
  NOT_FOUND: 'User not found!',
};
const FULLNAME = {
  ATLEAST: 'fullname should be atleast 3 characters!',
  ATMOST: 'fullname should be atmost 30 characters!',
};

const VALIDATION = {
  INVALID_EMAIL: 'Invalid Email Address!',
  INVALID_PASSWORD: 'Invalid Password!',
};

const TOKEN = {
  NO_REFRESH_TOKEN: 'No refresh token!',
  ACCESS_TOKEN_RENEWED: 'Access token renewed!',
  UNAUTHORIZED: 'Unauthorized - Invalid or Expired access token!',
  ACCESS_TOKEN_EXPIRES_IN: '10m',
  REFRESH_TOKEN_EXPIRES_IN: '7d',
};

export { USERNAME, FULLNAME, VALIDATION, TOKEN };
