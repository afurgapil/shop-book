import React from "react";
import { Provider } from "react-redux";
import { store } from "./src/store/index";
import Main from "./src/main";

const App = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};

export default App;
