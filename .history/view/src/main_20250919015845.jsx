import React from 'react';
import ReactDOM from 'react-dom/client';
import Favicon from 'react-favicon';

// React Redux
import { Provider } from 'react-redux';
import store from './store/store';

// import App Component
import App from './App';
import FavLogo from './components/images/bb-logo.svg';

const root = document.querySelector('#root');

ReactDOM.createRoot(root).render(
  <Provider store={store}>
    <Favicon url={FavLogo} />
    <App />
  </Provider>
);
