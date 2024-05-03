import React from "react";
import ReactDOM from "react-dom/client";

// React Redux
import store from "./store";
import { Provider } from "react-redux";

// import App Component
import App from "./App";

import "./index.css"

const root = document.querySelector("#root");

ReactDOM.createRoot(root).render(
  <Provider store={store}>
    <App />
  </Provider>
);
