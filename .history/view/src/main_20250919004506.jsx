import React from "react";
import ReactDOM from "react-dom/client";
import Favicon from "react-favicon";

// React Redux
import store from "./store/store";
import { Provider } from "react-redux";

// import App Component
import App from "./App";
import FavLogo from "./components/images/bb-logo.svg";

// Import test function in development
if (import.meta.env.DEV) {
  import('./test-redux-integration.js');
}

const root = document.querySelector("#root");

ReactDOM.createRoot(root).render(
  <Provider store={store}>
    <Favicon url={FavLogo} />
    <App />
  </Provider>
);
