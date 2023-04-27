import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

//Redux
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";

const root = createRoot(document.getElementById("root"));
const CLIENT_BASE_URL = process.env.REACT_APP_CLIENT_BASE_URL || "";
root.render(
  <Provider store={store}>
    <BrowserRouter basename={CLIENT_BASE_URL}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>
);
