import { configureStore } from "@reduxjs/toolkit";

import user from "./slices/user";
import despesas from "./slices/despesas";
import receitas from "./slices/receitas";

export default configureStore({
  reducer: {
    user,
    despesas,
    receitas,
  },
});
