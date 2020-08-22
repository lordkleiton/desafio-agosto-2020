import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import userReducer from "./slices/user";
import despesasReducer from "./slices/despesas";

export default configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    despesas: despesasReducer,
  },
});
