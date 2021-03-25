import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./components/auth/Register";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LogIn from "./components/auth/Login";

import Home from "./components/Home";
/*import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
library.add(faEdit);
*/

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register}></Route>
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/login" component={LogIn} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
