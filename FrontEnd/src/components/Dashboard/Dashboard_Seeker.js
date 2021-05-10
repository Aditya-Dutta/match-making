import React, { Component } from "react";
import AuthSeeker from "../services/AuthSeeker";
import AuthService from "../services/AuthService";
import SideBar from "./SideBar";
import JobCard from "./Card";

//home page for all users
export default class Dashboard_Seeker extends Component {
  constructor(props) {
    super(props);

    //  this.logOut = this.logOut.bind(this);
    this.state = {
      jobList: [],

      currentUser: false,
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) this.setState({ redirect: "/" });

    this.setState({ currentUser: currentUser, userReady: true });

    // console.log(currentUser.roles);
    AuthSeeker.get_job().then((result) => {
      this.setState({
        jobList: result.data,
      });
    });
  }

  handleDropDown(e) {
    this.setState({});
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
                <i className="fas fa-search"></i>
              </span>
            </div>
            <input
              className="form-control form-control-dark"
              type="text"
              placeholder="Search"
              aria-label="Search"
            />
          </div>

          <div className="job-search-div">
            <select
              onChange={this.handleDropDown}
              className="form-select form-select-sm drop-down"
              aria-label=".form-select-sm example"
            >
              <option value="Full">Job Type</option>
              <option value="Full">Full Time</option>
              <option value="Part">Part Time</option>
              <option value="Casual">Casual</option>
            </select>
            <input
              className="form-control form-control-dark w-50 location-input"
              type="text"
              placeholder="Location"
              aria-label="location"
            />
            <button type="button" className="btn btn-success">
              Find
            </button>
          </div>
        

        
          
          {this.state.jobList.map((item) => (
            <JobCard
              jobTitle={item.jobTitle}
              jobDescription={item.jobDescription}
              jobType={item.jobType}
              locationType={item.locationPincode}
              category={item.category}
              payType={item.payType}
            />
          ))}
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
