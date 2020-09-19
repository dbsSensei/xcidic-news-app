import React from 'react';
import { Provider } from "react-redux";

import Providers from './app/navigation';
// import Router from "./app/router";
import store from "./app/redux/store";

export default function App() {
  return (
    <Provider store={store}>

      <Providers />
    </Provider>)
}
