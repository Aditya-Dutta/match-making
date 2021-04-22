import React, { Component } from "react";
import AuthService from "../services/AuthService";
import SideBar from "./SideBar";

//home page for all users
export default class Dashboard_Seeker extends Component {
  constructor(props) {
    super(props);
    //  this.logOut = this.logOut.bind(this);
    this.state = {
      currentUser: false,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    //get the current user type
    if (user) {
      this.setState({
        currentUser: user,
        job_type: "",
        search: "",
      });
    }
  }

  render() {
    const { currentUser } = this.state;
    return (
      <React.Fragment>
        <SideBar />
        <main>
          <h1 className="dashboard-heading">Dashboard</h1>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">
                {" "}
                <i class="fas fa-search"></i>
              </span>
            </div>
            <input
              class="form-control form-control-dark"
              type="text"
              placeholder="Search"
              aria-label="Search"
            />
          </div>

          <div className="job-search-div">
            <select
              class="form-select form-select-sm drop-down"
              aria-label=".form-select-sm example"
            >
              <option selected>Job Type</option>
              <option value={this.state.job_type}>Full Time</option>
              <option value={this.state.job_type}>Part Time</option>
              <option value={this.state.job_type}>Casual</option>
            </select>
            <input
              class="form-control form-control-dark w-50 location-input"
              type="text"
              placeholder="Location"
              aria-label="location"
            />
            <button type="button" class="btn btn-success">
              Find
            </button>
          </div>
        </main>

        {/* {currentUser ? (
          <p>Implement Dash Board</p>
        ) : (
          <a className="name-link" href="/">
            <strong>Invalid Access</strong>
          </a>
        )}  Implement Later */}
      </React.Fragment>
    );
  }
}
