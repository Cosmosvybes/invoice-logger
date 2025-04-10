import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./States/store.ts";
import Layout from "./Components/UI/Tools/Layout/Layout.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Layout children={<App />} />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
