import { configureStore } from '@reduxjs/toolkit';

export interface AppState {
  csrf: string | null;
  loginType: string | null;
}

const initialState: AppState = {
  csrf: null,
  loginType: null,
};

const appReducer = (state: AppState = initialState, action: any) => {
  switch (action.type) {
    case 'SET_CSRF':
      return { ...state, csrf: action.payload };
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