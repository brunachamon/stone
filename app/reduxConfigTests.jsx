import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { render as rtlRender } from "@testing-library/react";
import { reducers } from "./src/store";

// import store from "./src/store";

// const render = (ui) => {
//   // const store = configureStore({ reducer: reducers });

//   const Wrapper = ({ children }) => (
//     <Provider store={store}>{children}</Provider>
//   );

//   return rtlRender(ui, { wrapper: Wrapper });
// };

// export default render;

const store = ({ preloadedState } = {}) => configureStore({ reducer: reducers, preloadedState });

function render(ui, { initialState, ...renderOptions } = {}) {
  function Wrapper({ children }) {
    return (
      <Provider store={store({ preloadedState: initialState })}>
        {children}
      </Provider>
    );
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export default render;
