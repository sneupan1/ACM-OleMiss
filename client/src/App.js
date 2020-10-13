import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/header.component";
import Alert from "./components/Alert/alert.component";
import SignupPage from "./pages/Signup/signupPage.component";
import LoginPage from "./pages/Login/loginPage.component";

function App() {
  return (
    <div className="App">
      <Header />
      <Alert />
      <Switch>
        <Route path="/register" component={SignupPage} />
        <Route path="/login" component={LoginPage} />
      </Switch>
    </div>
  );
}

export default App;
