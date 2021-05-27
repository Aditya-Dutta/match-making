import React, { Component } from "react";
import SideBar from "./SideBar";
import AuthService from "../services/AuthService";

export default class Dashboard_admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: undefined,
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) this.setState({ redirect: "/" });

    this.setState({ username: currentUser.username });
  }

  render() {
    return (
      <React.Fragment>
        <SideBar active="dashboard" />
        <main>
          <h1 className="name-of-user">{this.state.username}</h1>
          <h3 className="created-title">Admin Functionalities available: </h3>
          <ol className="admin-functionality-list">
            <li>Create a New Admin</li>
            <li>See all Employers / Seekers</li>
            <li>Delete users and other admins</li>
          </ol>
        </main>
      </React.Fragment>
    );
  }
}
