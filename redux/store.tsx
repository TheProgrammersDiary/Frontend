import { configureStore } from '@reduxjs/toolkit';

export interface AppState {
  jwt: string | null;
  loginType: string | null;
}

const initialState: AppState = {
  jwt: null,
  loginType: null,
};

const appReducer = (state: AppState = initialState, action: any) => {
  switch (action.type) {
    case 'SET_JWT':
      return { ...state, jwt: action.payload };
    case 'SET_LOGIN_TYPE':
      return { ...state, loginType: action.payload };
    default:
      return state;
  }
};

const store = configureStore({
  reducer: appReducer,
});

export default store;