import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//components
import NavBar from "./components/layout/NavBar";
import Routes from "./routing/Routes";

//redux
import store from "./store";
import { Provider } from "react-redux";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <Routes />
      </Router>
    </Provider>
  );
};

export default App;
