import React, { Component } from "react";
import AuthService from "../services/AuthService";
import SideBar from "./SideBar";

export default class AdminViewAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: undefined,
      employerUsername: "",
      applicants: [],
      isButtonDisabled: false,
      adminList: [],
    };
  }
  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (!user) this.setState({ redirect: "/" });

    if (user) {
      this.setState({
        currentUser: user,
        employerUsername: user.username,
      });
    }
    AuthService.viewAllAdmin().then((result) => {
      this.setState({ adminList: result.data });
    });
  }

  render() {
    return (
      <div>
        <SideBar active="admin_admin" />
        <main>
          <h2>All Admin </h2>
          <div className="component">
            {this.state.adminList.map((item) => (
              <article className="job-card">
                <div className="job-title">
                  {item.firstname} {item.lastname}
                </div>
                <div className="category">Username: {item.username}</div>
                <div className="description">Address: {item.address} </div>
                <div className="skills-container">
                  <div className="skill">Email: {item.email}</div>
                  <div className="skill">Phone: {item.phone}</div>
                </div>
              </article>
            ))}
          </div>
        </main>
      </div>
    );
  }
}
