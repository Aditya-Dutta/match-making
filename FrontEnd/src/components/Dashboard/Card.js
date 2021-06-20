import React, { Component } from "react";
import AuthSeeker from "../services/AuthSeeker";

// This is a reusable React component made to display Jobs in a specific format
// It helps make code more efficient and much smaller
export default class JobCard extends Component {
  constructor(props) {
    super(props);
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
    AuthSeeker.apply_job(this.state.jobId, this.state.currentUser);
    alert("Applied for job");
  }

  render() {
    // Different Kinds of cards are generated according to the type of users.
    // Seekers get an apply button while Employers and Admins don't.
    if (this.props.userType === "Seeker") {
      return (
        <React.Fragment>
          <form onSubmit={this.handleSubmit}>
            <article className="job-card">
              <div className="job-title">{this.props.jobTitle}</div>
              <div className="category">{this.props.category} </div>
              <div className="description">{this.props.jobDescription}</div>
              <div className="skills-container">
                <div className="skill">Pay: {this.props.payType}</div>
                <div className="skill">Job Type: {this.props.jobType}</div>
                <div className="skill">Location: {this.props.locationType}</div>
              </div>
              <button className="apply">Apply</button>
            </article>
          </form>
        </React.Fragment>
      );
    } else {
      return (
        <article className="job-card">
          <div className="job-title">{this.props.jobTitle}</div>
          <div className="category">{this.props.category} </div>
          <div className="description">{this.props.jobDescription}</div>
          <div className="skills-container">
            <div className="skill">Pay: {this.props.payType}</div>
            <div className="skill">Job Type: {this.props.jobType}</div>
            <div className="skill">Location: {this.props.locationType}</div>
          </div>
          {/* <button className="apply">Apply</button> */}
        </article>
      );
    }
  }
}
