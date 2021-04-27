import React, { Component } from "react";
import AuthService from "./services/AuthService";

//navbar
export default class Navbar extends Component {
  constructor(props) {
    super(props);
    //  this.logOut = this.logOut.bind(this);
    this.state = {
      showEmployeeBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    //get the current user type
    if (user) {
      this.setState({
        currentUser: user,
        showEmployeeBoard: user.roles.includes("ROLE_EMPLOYEE"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showAdminBoard } = this.state;
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
        {/*------------All User------------------------------------------------------------------------------------------------------------*/}
        {/* if current user, show the following links and navigations (COMMON TO ALL)*/}
        {currentUser ? (
          <a className="name-link" href="/dashboard">
            <strong>Jaxlooper</strong>
          </a>
        ) : (
          <a className="name-link" href="/">
            <strong>Jaxlooper</strong>
          </a>
        )}
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavDropdown"
        >
          <ul className="navbar-nav">
            {/*------------Admin User------------------------------------------------------------------------------------------------------------*/}
            {/* if Admin, show the following links and navigations*/}
            {showAdminBoard && (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <div className="nav-link">Admin</div>
                </li>

                <li className="nav-item">
                  <a href={"/userList"} className="nav-link">
                    View Users
                  </a>
                </li>
              </div>
            )}

            {/*------------Current User------------------------------------------------------------------------------------------------------------*/}

            {/* if current user, show the following links and navigations (COMMON TO ALL)*/}
            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a href={"/Dashboard_Seeker"} className="nav-link">
                    <strong> {currentUser.username}</strong>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    LogOut
                  </a>
                </li>
              </div>
            ) : (
              <li className="nav-item">
                <a className="nav-link" href={"/"}>
                  <strong>Home</strong>
                </a>
              </li>
            )}

            {/*------------------------------------------------------------------------------------------------------------------------*/}
          </ul>
        </div>
      </nav>
    );
  }
}
