import React, { Component } from "react";
import AuthSeeker from "./services/AuthSeeker";
import AuthService from "./services/AuthService";
import AuthEmployer from "./services/AuthEmployer";

// Navbar. Allows for logout and delete functionality.
export default class Navbar extends Component {
  constructor(props) {
    super(props);
    //  this.logOut = this.logOut.bind(this);
    this.state = {
      showEmployeeBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
      username: undefined,
    };
    this.deleteUser = this.deleteUser.bind(this);
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    //get the current user type
    if (user) {
      this.setState({
        currentUser: user,
        username: user.username,
        showEmployeeBoard: user.roles.includes("ROLE_EMPLOYEE"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  deleteUser() {
    // console.log(this.state.currentUser.roles);
    const role = this.state.currentUser.roles[0];
    console.log(role);
    if (role === "ROLE_EMPLOYER") {
      AuthEmployer.deleteEmployer(this.state.username);
    } else if (role === "ROLE_JOB_SEEKER") {
      AuthSeeker.deleteSeeker(this.state.username);
    } else {
      AuthService.deleteAdmin(this.state.username);
    }
    AuthService.logout();
  }

  handleNav = () => {
    const role = this.state.currentUser.roles[0];
    console.log(role);
    if (role === "ROLE_EMPLOYER") {
      // this.props.history.push("/Dashboard_Employer");
      window.location.href = "/Dashboard_Employer";
      // window.location.reload();
    } else if (role === "ROLE_JOB_SEEKER") {
      window.location.href = "/Dashboard_Seeker";
    } else {
      window.location.href = "/Dashboard_admin";
    }
  };

  render() {
    const { currentUser, showAdminBoard } = this.state;
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top mb-2">
        {/*------------All User------------------------------------------------------------------------------------------------------------*/}
        {/* if current user, show the following links and navigations (COMMON TO ALL)*/}
        {currentUser ? (
          <a className="name-link" href="/dashboard_employer">
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
                  <div className="nav-link" onClick={this.handleNav}>
                    Admin
                  </div>
                </li>
              </div>
            )}

            {/*------------Current User------------------------------------------------------------------------------------------------------------*/}

            {/* if current user, show the following links and navigations (COMMON TO ALL)*/}
            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a onClick={this.handleNav} className="nav-link">
                    <strong> {currentUser.username}</strong>
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Options
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <a
                      href="/login"
                      className="dropdown-item"
                      onClick={this.logOut}
                    >
                      LogOut
                    </a>
                    <a
                      className="dropdown-item"
                      onClick={this.deleteUser}
                      href="/login"
                    >
                      Delete
                    </a>
                  </div>
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
