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
import Dashboard_Admin from "./components/Dashboard/Dashboard_admin";
import ViewUsers from "./components/Dashboard/ViewUsers";
import CreateAdmin from "./components/Dashboard/CreateAdmin";
import Applicants from "./components/Dashboard/Applicants";
import JobApplincants from "./components/Dashboard/ApplicantsSeeker";
import ApplicantsProfile from "./components/Dashboard/ApplicantsProfile";
import AdminEmployers from "./components/Dashboard/AdminEmployer";
import AdminEmployees from "./components/Dashboard/AdminEmployee";
import AdminEmployerJobs from "./components/Dashboard/AdminEmployerJobs";
import AdminSeekerJobs from "./components/Dashboard/AdminSeekerJobs";
import AdminViewAdmin from "./components/Dashboard/AdminViewAdmin";

// Contains all the navigation routes.
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
        <Route
          exact
          path="/dashboard/view_applicants"
          component={JobApplincants}
        />
        <Route
          exact
          path="/dashboard/view_admin_employers"
          component={AdminEmployers}
        />
        <Route
          exact
          path="/dashboard/view_admin_employees"
          component={AdminEmployees}
        />
        <Route
          exact
          path="/dashboard/view_applicants_profile"
          component={ApplicantsProfile}
        />
        <Route
          exact
          path="/dashboard/admin/employer/jobs"
          component={AdminEmployerJobs}
        />
        <Route
          exact
          path="/dashboard/admin/seeker/jobs"
          component={AdminSeekerJobs}
        />
        <Route
          exact
          path="/dashboard/admin/viewAdmin"
          component={AdminViewAdmin}
        />
        <Route exact path="/dashboard/jobs" component={Jobs} />
        <Route exact path="/dashboard/create_job" component={CreateJob} />
        <Route exact path="/dashboard/appliedJobs" component={AppliedJobs} />
        <Route exact path="/dashboard_admin" component={Dashboard_Admin} />
        <Route exact path="/dashboard/viewUsers" component={ViewUsers} />
        <Route exact path="/dashboard/create_admin" component={CreateAdmin} />
        <Route exact path="/dashboard/applicants" component={Applicants} />
      </Switch>
    </Router>
  );
}

export default App;
