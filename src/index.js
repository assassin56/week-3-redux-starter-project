import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import rootReducer from './reducers/index';
import { Provider } from 'react-redux';
import { ReactReduxFireBaseProvider } from 'react-redux=fireBase';
import { createFirestoreInstance } from 'redux-firestore';
import firebase from "./firebase";

const store = createStore(rootReducer);

const rrfProps = {
  firebase,
  config: {
    userProfile: "users"
  },
  dispatch: store.dispatch,
  createFirestoreInstance
}

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFireBaseProvider {...rrfProps}>
      <App />
    </ReactReduxFireBaseProvider>
  </Provider>,
  document.getElementById('root')
);

// store.subscribe(() =>
//   console.log(store.getState())
// );
  serviceWorker.unregister();
