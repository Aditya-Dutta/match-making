import React, { Component } from "react";
import AuthSeeker from "../services/AuthSeeker";
import AuthService from "../services/AuthService";

export default class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: "",
    };
    this.renderContent = this.renderContent.bind(this);
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    this.setState({ currentUser: currentUser });
    if (!currentUser) this.setState({ redirect: "/" });

    this.setState({ currentUser: currentUser, userReady: true });

    console.log(currentUser.roles);
    AuthSeeker.get_job().then((result) => {
      this.setState({
        job_list: result.data,
      });
    });
  }

  renderContent() {
    // console.clear();
    console.log(this.state.currentUser.roles);
    if (this.state.currentUser.roles == "ROLE_EMPLOYER") {
      console.log("Employer Dashboard");
      return (
        <div class="sidenav">
          <a href="/dashboard_employer">Dashboard</a>
          <a href="/dashboard/profile">Profile</a>
          <a href="/dashboard/jobs">All Jobs Created</a>
          <a href="/dashboard/create_job">Create Job</a>
          <a href="#s">Applicants</a>
        </div>
      );
    } else {
      return (
        <div class="sidenav">
          <a href="/dashboard_seeker">Dashboard</a>
          <a href="/dashboard/profile">Profile</a>
          <a href="/dashboard/jobs">Saved Jobs</a>
          <a href="#s">Applied Jobs</a>
        </div>
      );
    }
  }

  render() {
    return <React.Fragment>{this.renderContent()}</React.Fragment>;
  }
}
