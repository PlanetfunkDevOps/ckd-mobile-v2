import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';

import menuReducer from './reducers/menuReducer';
import nameReducer from './reducers/nameReducer';
import loginReducer from './reducers/loginReducer';

/* Firebase config */
const firebaseConfig = {
  /* Your firebae key goes here */
};

/* react-redux-firebase config */
const rrfConfig = {
  userProfile: 'users',
  userFirestoreForProfile: true
};

/* Init firebase instance */
firebase.initializeApp(firebaseConfig);

/* init firestore */
const firestore = firebase.firestore();

/* Add reactReduxFirebase enhancer when making store creator */
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase)
)(createStore);

/* Add firebase to reducers */
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  openMenu: menuReducer,
  userName: nameReducer,
  loginModal: loginReducer
});

/* Create initial state */
const initialState = {};

/* Create store */
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(reactReduxFirebase(firebase))
);

export default store;
