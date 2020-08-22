import { generateSlice } from "./helpers/generate_slices";
import {
  find as _find,
  create as _create,
  remove as _remove,
  update as _update,
} from "./helpers/db_services";

/* config */

const model = "receitas";

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

const create = (data) => (dispatch) => {
  _create({ model, action: addToLocal }, dispatch);
};

const remove = (id) => (dispatch) => {
  _remove({ model, action: removeFromLocal, id }, dispatch);
};

const update = (id) => (dispatch) => {
  _update({ model, action: addToLocal, id }, dispatch);
};

/* exports */

export { local, loading, remove, create, update, find };

export default reducer;
