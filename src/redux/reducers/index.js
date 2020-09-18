import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'
import commentsReducer from './commentReducer';
// Add firebase to reducers
export default combineReducers({
    comments: commentsReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer
})