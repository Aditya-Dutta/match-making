import React, { Component } from "react";
import AuthSeeker from "../services/AuthSeeker";
import AuthEmployer from "../services/AuthEmployer";
import AuthService from "../services/AuthService";

export default class SideBar extends Component {
  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) this.setState({ redirect: "/" });

    this.setState({ currentUser: currentUser, userReady: true });

    console.log(currentUser.roles);
    AuthSeeker.get_job().then((result) => {
      this.setState({
        job_list: result.data,
      });
    });
  }

  render() {
    return (
      <div class="sidenav">
        <a href="/dashboard">Dashboard</a>
        <a href="/dashboard/profile">Profile</a>
        <a href="#p">Saved Jobs</a>
        <a href="#s">Applied Jobs</a>
      </div>
    );
  }
}
