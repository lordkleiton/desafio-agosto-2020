import { firestore } from "../../firebase";

const _db = (model) => firestore().collection(model);

const find = (data, dispatch) => {
  const { model, action } = data;

  _db(model)
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        _addDocToStore(doc, action, dispatch);
      });
    })
    .catch(_onError);
};

const create = (data, dispatch) => {
  const { model, action, newData } = data;

  _db(model)
    .add(newData)
    .then((newDoc) => {
      newDoc.get().then((doc) => {
        _addDocToStore(doc, action, dispatch);
      });
    })
    .catch(_onError);
};

const remove = (data, dispatch) => {
  const { model, id, action } = data;

  _db(model)
    .doc(id)
    .delete()
    .then(() => {
      dispatch(action(id));
    })
    .catch(_onError);
};

const update = (data, dispatch) => {
  const { model, id, action, newData } = data;

  _db(model)
    .doc(id)
    .update(newData)
    .then(() => {
      _db(model)
        .doc(id)
        .get()
        .then((doc) => {
          _addDocToStore(doc, action, dispatch);
        })
        .catch(_onError);
    })
    .catch(_onError);
};

/* utils */

const _onError = (e) => console.log(e);

const _addDocToStore = (doc, action, dispatch) => {
  const data = { id: doc.id, ...doc.data() };

  dispatch(action(_serialize(data)));
};

const _serialize = (data) => JSON.parse(JSON.stringify(data));

/* exports */

export { find, create, remove, update };
