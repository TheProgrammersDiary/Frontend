export const setUsername = (username) => ({
  type: 'SET_USERNAME',
  payload: username,
});

export const setJwt = (jwt) => ({
  type: 'SET_JWT',
  payload: jwt,
});
  
export const setLoginType = (loginType) => ({
  type: 'SET_LOGIN_TYPE',
  payload: loginType,
});