import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App";
import store from "./store";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <div className="h-full bg-gray-50 dark:bg-gray-500">
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </div>
);
