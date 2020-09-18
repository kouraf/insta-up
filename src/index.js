import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { createFirestoreInstance } from 'redux-firestore'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import "firebase/storage";
import './index.css';
import App from './App';
import rootReducer from './redux/reducers';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

const firebaseConfig = {
  apiKey: "AIzaSyCTLgkfk4P9SRC6Vnvxw6cbgBsp8qmKdGw",
  authDomain: "insta-up-b7af5.firebaseapp.com",
  databaseURL: "https://insta-up-b7af5.firebaseio.com",
  projectId: "insta-up-b7af5",
  storageBucket: "insta-up-b7af5.appspot.com",
  messagingSenderId: "370739050143",
  appId: "1:370739050143:web:fbd7cc3d9a9c469eef14aa",
  measurementId: "G-2VYJ9HG5BE"
}

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

// Initialize firebase instance
firebase.initializeApp(firebaseConfig)

// Initialize other services on firebase instance
firebase.firestore() // <- needed if using firestore



// Create store with reducers and initial state
const initialState = {}
const store = createStore(rootReducer, initialState)

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
}


ReactDOM.render(
  <Router>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <App />
      </ReactReduxFirebaseProvider>
    </Provider>
  </Router>
  ,
  document.getElementById('root')
);
