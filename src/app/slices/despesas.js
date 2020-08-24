import { generateSlice } from "./helpers/generate_slices";
import {
  find as _find,
  create as _create,
  remove as _remove,
  update as _update,
} from "./helpers/db_services";
import firebase from "firebase";

/* config */

const model = "despesas";

/* slice */

const _slice = generateSlice(model);

const { actions, reducer } = _slice;

const { addToLocal, removeFromLocal } = actions;

/* getters */

const local = (state) => state[model].local;

const loading = (state) => state[model].loading;

/* operações */

const find = () => (dispatch) => {
  _find({ model, action: addToLocal }, dispatch);
};

const create = (_data) => (dispatch) => {
  const { valor, descricao, data, pago } = _data;
  const newData = _toModel(valor, descricao, data, pago);

  _create({ model, action: addToLocal, newData }, dispatch);
};

const remove = (id) => (dispatch) => {
  _remove({ model, action: removeFromLocal, id }, dispatch);
};

const update = (_data) => (dispatch) => {
  const { id, valor, descricao, data, pago } = _data;
  const newData = _toModel(valor, descricao, data, pago);

  _update({ model, action: addToLocal, id, newData }, dispatch);
};

/* utils */

const _toModel = (valor, descricao, data, pago) => ({
  valor: parseFloat(valor),
  descricao,
  data: firebase.firestore.Timestamp.fromDate(new Date(data)),
  pago,
});

/* exports */

export { local, loading, remove, create, update, find };

export default reducer;
