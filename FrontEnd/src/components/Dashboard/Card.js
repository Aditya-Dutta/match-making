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
            {/* <div classNameName="col-md-12 job-card">
              <div classNameName="card">
                <div classNameName="card-body">
                  <h5 classNameName="card-title">{this.props.jobTitle}</h5>
                  <h6 classNameName="card-subtitle mb-2">
                    Category: {this.props.category}
                  </h6>
                  <p classNameName="card-text">
                    Job Type: {this.props.jobType} <br />
                    Description: {this.props.jobDescription}
                  </p>
                  <p classNameName="card-text last-text">
                    Pay Type: {this.props.payType} <br />
                    Location Type: {this.props.locationType}
                  </p>
                  <button classNameName="apply-job-btn">Apply</button>
                </div>
              </div>
            </div> */}
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