import React from "react";
import { Store } from "redux";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import AppStore from "./configurations/AppStore";
import { Provider } from "react-redux";

const container = document.getElementById("app")! as HTMLElement;
const root = createRoot(container);

root.render(
  <Provider store={AppStore as Store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
