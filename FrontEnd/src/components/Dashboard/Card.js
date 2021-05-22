import React, { Component } from "react";
import AuthSeeker from "../services/AuthSeeker";

// const JobCard = (props) => {
export default class JobCard extends Component {
  constructor(props) {
    super(props);
    // console.log(props);
    //  this.logOut = this.logOut.bind(this);
    this.state = {
      jobTitle: "",
      jobType: "",
      locationPincode: "",
      skills: "",
      workType: "",
      payType: "",
      category: "",
      jobDescription: "",
      employerUsername: "",
      jobId: "",
      currentUser: undefined,
    };
    console.log(props);
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
    AuthSeeker.apply_job(this.state.jobId, this.state.currentUser);
    alert("Applied for job");
  }

  render() {
    if (this.props.userType === "Seeker") {
      return (
        <React.Fragment>
          <form onSubmit={this.handleSubmit}>
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
                  <p className="card-text last-text">
                    Pay Type: {this.props.payType} <br />
                    Location Type: {this.props.locationType}
                  </p>
                  <button className="apply-job-btn">Apply</button>
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
