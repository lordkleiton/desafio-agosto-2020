import { createSlice } from "@reduxjs/toolkit";

import * as firebase from "firebase/app";
import "firebase/auth";

import { auth as localAuth } from "../firebase";

const initialState = {
  user: null,
  signedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    setSignedIn: (state, { payload }) => {
      state.signedIn = payload;
    },
    reset: () => initialState,
  },
});

const { setUser, setSignedIn, reset } = userSlice.actions;

const login = (onSuccess) => (dispatch) => {
  localAuth()
    .signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then((r) => {
      dispatch(setUser(JSON.parse(JSON.stringify(r.user))));
      dispatch(setSignedIn(true));

      if (onSuccess) onSuccess();
    })
    .catch((e) => {
      console.log(e);
    });
};

const logout = () => (dispatch) => {
  localAuth()
    .signOut()
    .then(() => {
      dispatch(reset());
    })
    .catch((e) => {
      console.log(e);
    });
};

const activeUser = (state) => state.user.user;

const loggedIn = (state) => state.user.signedIn;

export { login, logout, activeUser, loggedIn };

export default userSlice.reducer;
