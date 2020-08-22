import { configureStore } from "@reduxjs/toolkit";

/* reducers */

import counter from "../features/counter/counterSlice";
import user from "./slices/user";
import despesas from "./slices/despesas";
import receitas from "./slices/receitas";

export default configureStore({
  reducer: {
    counter,
    user,
    despesas,
    receitas,
  },
});
