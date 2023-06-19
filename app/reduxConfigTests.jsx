import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { render as rtlRender } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { reducers } from "./src/store";

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
export { store };
