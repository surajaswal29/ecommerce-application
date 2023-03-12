import React from "react";
import ReactDOM from "react-dom/client";
import Favicon from "react-favicon";

// React Redux
import store from "./store";
import { Provider } from "react-redux";

// import App Component
import App from "./App";
import FavLogo from "./components/images/bb-logo-1.svg";

const root = document.querySelector("#root");

ReactDOM.createRoot(root).render(
  <Provider store={store}>
    <Favicon url={FavLogo} />
    <App />
  </Provider>
);
