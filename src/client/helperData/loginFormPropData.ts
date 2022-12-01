export const loginInputUsernamePropData = {
  name: 'username',
  type: "text",
  placeholder: 'Username',
  pattern: '[A-Za-z0-9_]{6,20}$',
  errorMessage: 'Username should be between 6 - 20 letters or numbers',
  required: true,
  htmlFor: 'username'
};

export const loginInputPasswordPropData = {
  name: 'password',
  type: "password",
  placeholder: 'Password',
  pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$])[a-zA-Z0-9!@#$]{6,20}$`,
  errorMessage: `Password should be between 6 - 20 characters, containing at least one letter, one number, and one special character: !@#$`,
  required: true,
  htmlFor: 'password',
};