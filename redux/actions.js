export const setCsrf = (csrf) => ({
    type: 'SET_CSRF',
    payload: csrf,
  });
  
  export const setLoginType = (loginType) => ({
    type: 'SET_LOGIN_TYPE',
    payload: loginType,
  });