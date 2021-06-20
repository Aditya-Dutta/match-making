import React, { Component } from "react";
import AuthEmployer from "../services/AuthEmployer";
import AuthSeeker from "../services/AuthSeeker";
import AuthService from "../services/AuthService";

// Reusable React component made to make more efficient code and avoid repitition.
// Also this has selective rendering so Admins get the delete functionality but
// Employers or Seekers do not.
export default class UsersCard extends Component {
  constructor(props) {
    super(props);
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
    // console.log(props);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  render() {
    if (this.props.userType === "Admin") {
      return (
        <React.Fragment>
          <form onSubmit={this.handleSubmit}>
            <article className="job-card">
              <div className="username">Username: {this.props.username}</div>
              <div className="firstname">
                FirstName: {this.props.firstname} LastName:{" "}
                {this.props.lastname}
              </div>
              <div className="address">Address: {this.props.address}</div>
              <div className="email">Email: {this.props.email}</div>
              <div className="phone">Phone Number: {this.props.phone}</div>
              <div className="job-type-container">
                <div className="job-type">
                  User Type: {this.props.user_type}
                </div>
              </div>
              <button className="delete-bt">Delete</button>
            </article>
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
