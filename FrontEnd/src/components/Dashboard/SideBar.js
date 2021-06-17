import React, { Component } from "react";
import AuthSeeker from "../services/AuthSeeker";
import AuthService from "../services/AuthService";

export default class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: "",
      active: props.active,
    };
    console.log(this.state.active);
    this.renderContent = this.renderContent.bind(this);
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    this.setState({ currentUser: currentUser });
    if (!currentUser) this.setState({ redirect: "/" });

    this.setState({ currentUser: currentUser, userReady: true });

    // console.log(currentUser.roles);
    AuthSeeker.get_job().then((result) => {
      this.setState({
        job_list: result.data,
      });
    });
  }

  renderContent() {
    // console.clear();
    // console.log(this.state.currentUser.roles);
    const active = this.state.active;
    // console.log(active);

    if (this.state.currentUser.roles == "ROLE_EMPLOYER") {
      // console.log("Employer Dashboard");
      return (
        <div className="sidenav">
          {active === "dashboard" ? (
            <a href="/dashboard_employer" className="side-active">
              Dashboard
            </a>
          ) : (
            <a href="/dashboard_employer">Dashboard</a>
          )}
          {active === "all_jobs" ? (
            <a href="/dashboard/jobs" className="side-active">
              All Jobs Created
            </a>
          ) : (
            <a href="/dashboard/jobs">All Jobs Created</a>
          )}

          {active === "create" ? (
            <a href="/dashboard/create_job" className="side-active">
              Create Job
            </a>
          ) : (
            <a href="/dashboard/create_job">Create Job</a>
          )}
          {active === "applicants" ? (
            <a href="/dashboard/applicants" className="side-active">
              Applicants
            </a>
          ) : (
            <a href="/dashboard/applicants">Applicants</a>
          )}
        </div>
      );
    } else if (this.state.currentUser.roles == "ROLE_JOB_SEEKER") {
      return (
        <div className="sidenav">
          {active === "dashboard" ? (
            <a href="/dashboard_seeker" className="side-active">
              Dashboard
            </a>
          ) : (
            <a href="/dashboard_seeker">Dashboard</a>
          )}

          {active === "profile" ? (
            <a href="/dashboard/profile" className="side-active">
              Profile
            </a>
          ) : (
            <a href="/dashboard/profile">Profile</a>
          )}
          {active == "appJobs" ? (
            <a href="/dashboard/appliedJobs" className="side-active">
              Applied Jobs
            </a>
          ) : (
            <a href="/dashboard/appliedJobs">Applied Jobs</a>
          )}
        </div>
      );
    } else {
      return (
        <div className="sidenav">
          {active === "dashboard" ? (
            <a href="/dashboard_admin" className="side-active">
              Dashboard
            </a>
          ) : (
            <a href="/dashboard_admin">Dashboard</a>
          )}

          {active === "viewUsers" ? (
            <a href="/dashboard/viewUsers" className="side-active">
              All Users
            </a>
          ) : (
            <a href="/dashboard/viewUsers">All Users</a>
          )}
          
           <a href="/dashboard/view_admin_employees">
              Job Seeker
            </a>
            <a href="/dashboard/view_admin_employers" >
              Employers
            </a>
            <a href="/dashboard/admin/viewAdmin" >
              Admin
            </a>


          {active === "create" ? (
            <a href="/dashboard/create_admin" className="side-active">
              Add Admin
            </a>
          ) : (
            <a href="/dashboard/create_admin">Add Admin</a>
          )}
        </div>
      );
    }
  }

  render() {
    return <React.Fragment>{this.renderContent()}</React.Fragment>;
  }
}
