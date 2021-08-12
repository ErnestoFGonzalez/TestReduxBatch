// @flow

import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type AuthState = {
  token: string | null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
  },
  reducers: {
    setToken: (
      state: AuthState,
      action: PayloadAction<string | null>,
    ): void => {
      state.token = action.payload;
    },
  },
});

export const {setToken} = authSlice.actions;

export default authSlice.reducer;
