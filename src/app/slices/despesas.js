import { firestore } from "../firebase";
import firebase from "firebase";
import { generateSlice } from "./helpers/generate_slices";

/* configs */

const _model = "despesas";

const _db = () => firestore().collection(_model);

/* slice */

const _slice = generateSlice(_model);

const { actions, reducer } = _slice;

const { addToLocal, removeFromLocal } = actions;

/* getters */

const local = (state) => state[_model].local;

const loading = (state) => state[_model].loading;

/* operações */

const _get = (id) => (dispatch) => {
  _db()
    .doc(id)
    .get()
    .then((doc) => {
      _addDocToStore(doc, dispatch);
    })
    .catch(_onError);
};

const find = () => (dispatch) => {
  _db()
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        _addDocToStore(doc, dispatch);
      });
    })
    .catch(_onError);
};

const create = (data) => (dispatch) => {
  _db()
    .add(_toModel(10, "blablabla", new Date(), false))
    .then((newDoc) => {
      newDoc.get().then((doc) => {
        _addDocToStore(doc, dispatch);
      });
    })
    .catch(_onError);
};

const remove = (id) => (dispatch) => {
  _db()
    .doc(id)
    .delete()
    .then(() => {
      dispatch(removeFromLocal(id));
    })
    .catch(_onError);
};

const update = (id) => (dispatch) => {
  _db()
    .doc(id)
    .update(_toModel(155, "umu", new Date(), false))
    .then(() => {
      dispatch(_get(id));
    })
    .catch(_onError);
};

/* utils */

const _onError = (e) => console.log(e);

const _addDocToStore = (doc, dispatch) => {
  const data = { id: doc.id, ...doc.data() };

  dispatch(addToLocal(_serialize(data)));
};

const _serialize = (data) => JSON.parse(JSON.stringify(data));

const _toModel = (valor, descricao, data, pago) => ({
  valor: parseFloat(valor),
  descricao,
  data: firebase.firestore.Timestamp.fromDate(data),
  pago,
});

/* exports */

export { local, remove, create, update, loading, find };

export default reducer;
