import { createSlice } from "@reduxjs/toolkit";
import { firestore } from "../firebase";
import firebase from "firebase";

const model = "despesas";

const db = () => firestore().collection(model);

const initialState = {
  local: {},
  createLoading: false,
  getLoading: false,
  patchLoading: false,
  deleteLoading: false,
};

const slice = createSlice({
  name: model,
  initialState,
  reducers: {
    addToLocal: (state, { payload }) => {
      state.local[payload.id] = payload;
    },
    removeFromLocal: (state, { payload }) => {
      delete state.local[payload];
    },
    toggleCreateLoading: (state) => {
      state.createLoading = !state.createLoading;
    },
    toggleGetLoading: (state) => {
      state.getLoading = !state.getLoading;
    },
  },
});

const { addToLocal, removeFromLocal } = slice.actions;

/* getters */

const local = (state) => state[model].local;

/* operações */

const get = () => (dispatch) => {
  db()
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        const data = { id: doc.id, ...doc.data() };

        dispatch(addToLocal(JSON.parse(JSON.stringify(data))));
      });
    })
    .catch((e) => {
      console.log(e);
    });
};

const remove = (id) => (dispatch) => {
  db()
    .doc(id)
    .delete()
    .then(() => {
      dispatch(removeFromLocal(id));
    })
    .catch((e) => {
      console.log(e);
    });
};

const create = () => (dispatch) => {
  db()
    .add(toModel(10, "blablabla", new Date(), false))
    .then((newDoc) => {
      newDoc.get().then((doc) => {
        const data = { id: doc.id, ...doc.data() };

        dispatch(addToLocal(JSON.parse(JSON.stringify(data))));
      });
    })
    .catch((e) => {
      console.log(e);
    });
};

/* utils */

const toModel = (valor, descricao, data, pago) => ({
  valor: parseFloat(valor),
  descricao,
  data: firebase.firestore.Timestamp.fromDate(data),
  pago,
});

/* exports */

export { get, local, remove, create };

export default slice.reducer;
