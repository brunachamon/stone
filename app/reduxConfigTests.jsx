import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { render as rtlRender } from "@testing-library/react";
import { reducers } from "./src/store";
import { BrowserRouter as Router } from "react-router-dom";

const store = ({ preloadedState } = {}) =>
  configureStore({ reducer: reducers, preloadedState });

function render(ui, { initialState, ...renderOptions } = {}) {
  function Wrapper({ children }) {
    return (
      <Provider store={store({ preloadedState: initialState })}>
        <Router>{children}</Router>
      </Provider>
    );
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export default render;
