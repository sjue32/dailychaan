const validCredentialsPasswordData = {
  Item: {
    username: 'testuser123',
    email: 'testuser123@example.com',
    fav_users: {},
    password: '$2b$10$5u7liI0YlhGhUrL8sRsw/umTrGDY3xo23TwlmvGqHDZwTxI2GzH72', // test123!
    user_id: 10,
  },
};

const validCredentials = {
  usernameInput: 'testuser123',
  passwordInput: 'test123!',
};

const invalidCredentialsPasswordData = {
  Item: {
    username: 'testuser123',
    email: 'testuser123@example.com',
    fav_users: {},
    password: '$2b$10$5u7liI0YlhGhUrL8sRsw/umTrGDY3xo23TwlmvGqHDZwTxI2GzH72', // test123!
    user_id: 10,
  },
};

const invalidCredentials = {
  usernameInput: 'testuser123',
  passwordInput: 'test',
};


const invalidUsernameData = {
  // @ts-expect-error Item value should be undefined
  Item: undefined 
};

const invalidUsernameCredentials = {
  usernameInput: 'fakeUser123',
  passwordInput: 'fakeuser123!',
};

const usernameExistsData = {
  Item: true,
};

const usernameExistsCredentials = {
  usernameInput: 'testuser123',
  passwordInput:  'testuser123!',
  emailInput: 'testuser123@example.com',
};

const usernameDoesNotExist = {
  // @ts-expect-error Item value should be undefined
  Item: undefined,
};

const successfulCreateUserCredentials = {
  usernameInput: 'testuser123',
  passwordInput:  'testuser123!',
  emailInput: 'testuser123@example.com',
};

export { validCredentials, validCredentialsPasswordData, invalidCredentials, 
  invalidCredentialsPasswordData, invalidUsernameData, invalidUsernameCredentials,
  usernameExistsData, usernameExistsCredentials, usernameDoesNotExist, successfulCreateUserCredentials } ;