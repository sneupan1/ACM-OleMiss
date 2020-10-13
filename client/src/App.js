import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/header.component";
import SignupPage from "./pages/Signup/signupPage.component";
import LoginPage from "./pages/Login/loginPage.component";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/register" component={SignupPage} />
        <Route path="/login" component={LoginPage} />
      </Switch>
    </div>
  );
}

export default App;
