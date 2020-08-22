import { createSlice } from "@reduxjs/toolkit";
import { firestore } from "../firebase";
import firebase from "firebase";

const model = "despesas";

const db = () => firestore().collection(model);

const initialState = {
  local: {},
  loading: false,
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
    toggleLoading: (state) => {
      state.loading = !state.loading;
    },
  },
});

const { addToLocal, removeFromLocal, toggleLoading } = slice.actions;

/* getters */

const local = (state) => state[model].local;

const loading = (state) => state[model].loading;

/* operações */

const get = () => (dispatch) => {
  db()
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        const data = { id: doc.id, ...doc.data() };

        dispatch(addToLocal(serialize(data)));
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

        dispatch(addToLocal(serialize(data)));
      });
    })
    .catch((e) => {
      console.log(e);
    });
};

const update = (id) => (dispatch) => {
  db()
    .doc(id)
    .update(toModel(155, "uwu", new Date(), false))
    .then(() => {
      db()
        .doc(id)
        .get()
        .then((doc) => {
          const data = { id: doc.id, ...doc.data() };

          dispatch(addToLocal(serialize(data)));
        })
        .catch((e) => {
          console.log(e);
        });
    })
    .catch((e) => {
      console.log(e);
    });
};

/* utils */

const serialize = (data) => JSON.parse(JSON.stringify(data));

const toModel = (valor, descricao, data, pago) => ({
  valor: parseFloat(valor),
  descricao,
  data: firebase.firestore.Timestamp.fromDate(data),
  pago,
});

/* exports */

export { get, local, remove, create, update, loading };

export default slice.reducer;
