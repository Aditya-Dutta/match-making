import React, { Component } from "react";
import AuthEmployer from "../services/AuthEmployer";
import AuthSeeker from "../services/AuthSeeker";
import AuthService from "../services/AuthService";

// const JobCard = (props) => {
export default class UsersCard extends Component {
  constructor(props) {
    super(props);
    // console.log(props);
    //  this.logOut = this.logOut.bind(this);
    this.state = {
      username: undefined,
      address: "",
      firstname: "",
      lastname: "",
      phone: "",
      email: "",
      user_type: "",
      currentUser: undefined,
    };
    console.log(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.setState({
      jobId: this.props.jobId,
      currentUser: this.props.username,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    // Delete the user here
    // console.log(this.props);
    if (this.props.user_type === "JOB_SEEKER") {
      AuthSeeker.deleteSeeker(this.props.username);
    } else if (this.props.user_type == "EMPLOYER") {
      AuthEmployer.deleteEmployer(this.props.username);
    } else {
      AuthService.deleteAdmin(this.props.username);
    }
    alert(this.props.username + " has been deleted");
    document.location.reload();
  }

  // handleDelete() {
  //   console.log(this.props);
  // }

  render() {
    if (this.props.userType === "Admin") {
      return (
        <React.Fragment>
          <form onSubmit={this.handleSubmit}>
            <div className="col-md-12 job-card">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{this.props.username}</h5>
                  <h6 className="card-subtitle mb-2">
                    {this.props.firstname} {this.props.lastname}
                  </h6>
                  <p className="card-text">
                    User Type: {this.props.user_type} <br />
                    Address: {this.props.address}
                  </p>
                  <p className="card-text last-text">
                    Email: {this.props.email} <br />
                    Phone: {this.props.phone}
                  </p>
                  <button className="apply-job-btn">Delete</button>
                  {/* {button} */}
                </div>
              </div>
            </div>
          </form>
        </React.Fragment>
      );
    } else {
      return (
        <div className="col-md-12 job-card">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{this.props.jobTitle}</h5>
              <h6 className="card-subtitle mb-2">
                Category: {this.props.category}
              </h6>
              <p className="card-text">
                Job Type: {this.props.jobType} <br />
                Description: {this.props.jobDescription}
              </p>
              <p className="card-text">
                Pay Type: {this.props.payType} <br />
                Location Type: {this.props.locationType}
              </p>
            </div>
          </div>
        </div>
      );
    }
  }
}
