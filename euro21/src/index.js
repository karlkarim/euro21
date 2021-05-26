import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { StoreProvider, createStore } from "easy-peasy";
import model from './Models'
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
const store = createStore(model)
ReactDOM.render(
  <BrowserRouter>
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

reportWebVitals();
