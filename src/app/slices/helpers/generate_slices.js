import { createSlice } from "@reduxjs/toolkit";

const generateSlice = (model) => {
  const initialState = {
    local: {},
    loading: false,
  };

  const result = createSlice({
    name: model,
    initialState,
    reducers: {
      addToLocal: (state, { payload }) => {
        state.local[payload.id] = payload;
      },
      removeFromLocal: (state, { payload }) => {
        delete state.local[payload];
      },
      toggleLoading: (state) => {
        state.loading = !state.loading;
      },
    },
  });

  return result;
};

export { generateSlice };
