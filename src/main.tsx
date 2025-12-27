import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./States/store.ts";
// import Layout from "./Components/UI/Tools/Layout/Layout.tsx";
import Authcontext from "./Components/UI/Tools/Layout/context/Authcontext.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Authcontext>
          <App />
        </Authcontext>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
