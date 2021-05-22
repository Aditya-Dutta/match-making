import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./components/auth/Register";
import Navbar from "./components/Navbar";
import LogIn from "./components/auth/Login";
import Home from "./components/Home";
import UserList from "./components/Admin/UserList";
import Profile from "./components/Dashboard/Profile";
import Dashboard_Seeker from "./components/Dashboard/Dashboard_Seeker";
import Dashboard_Employer from "./components/Dashboard/Dashboard_Employer";
import Jobs from "./components/Dashboard/Jobs";
import CreateJob from "./components/Dashboard/CreateJob";
import AppliedJobs from "./components/Dashboard/AppliedJobs";
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { faEdit } from '@fortawesome/free-solid-svg-icons';
// library.add(faEdit);

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register}></Route>
        <Route exact path="/dashboard_seeker" component={Dashboard_Seeker} />
        <Route exact path="/login" component={LogIn} />
        <Route exact path="/userlist" component={UserList} />
        <Route exact path="/dashboard/profile" component={Profile} />
        <Route
          exact
          path="/dashboard_employer"
          component={Dashboard_Employer}
        />
        <Route exact path="/dashboard/jobs" component={Jobs} />
        <Route exact path="/dashboard/create_job" component={CreateJob} />
        <Route exact path="/dashboard/appliedJobs" component={AppliedJobs} />
      </Switch>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
