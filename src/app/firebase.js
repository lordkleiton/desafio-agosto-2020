import firebase from "firebase";

const config = {
  apiKey: "AIzaSyAk7ttB0UkNNtzgadaVdr2NkUm1EdP-X3w",
  authDomain: "mario-desafio-agosto-2020.firebaseapp.com",
  databaseURL: "https://mario-desafio-agosto-2020.firebaseio.com",
  projectId: "mario-desafio-agosto-2020",
  storageBucket: "mario-desafio-agosto-2020.appspot.com",
  messagingSenderId: "313577359008",
  appId: "1:313577359008:web:4b151d907c4708bd38abc5",
};

const _fire = firebase.initializeApp(config);

const auth = () => _fire.auth();

const firestore = () => _fire.firestore();

export { auth, firestore };
