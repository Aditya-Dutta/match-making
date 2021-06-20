import React, { Component } from "react";
import AuthEmployer from "../services/AuthEmployer";
import AuthService from "../services/AuthService";
import SideBar from "./SideBar";

export default class AdminEmployerJobs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: undefined,
      employerUsername: "",
      applicants: [],
      isButtonDisabled: false,
      empList: [],
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

    AuthEmployer.get_all_jobs(this.props.location.state.username).then(
      (result) => {
        this.setState({ empList: result.data });
        console.log(result.data);
      }
    );

    //console.log(this.props.location.state.job_id);
    // AuthProfile.getProfile(this.props.location.state.username).then(
    //     (result)=>{
    //         this.setState({ profileList: result.data });
    //         console.log(result.data);
    //     }
    // );
  }

  viewApplicants(values) {
    this.props.history.push({
      pathname: "/dashboard/view_applicants",
      state: { job_id: values },
    });
  }

  render() {
    return (
      <div>
        <SideBar active="applicants" />
        <main>
          <h2>All Jobs of {this.props.location.state.username}</h2>
          <div className="component">
            {this.state.empList.map((item) => (
              <article className="job-card">
                <div className="job-title">{item.jobTitle}</div>
                <div className="category">{item.category} </div>
                <div className="description">{item.jobDescription}</div>
                <div className="skills-container">
                  <div className="skill">Pay: {item.payType}</div>
                  <div className="skill">Job Type: {item.jobType}</div>
                  <div className="skill">Location: {item.locationPincode}</div>
                </div>

                <button
                  className="apply"
                  onClick={() => this.viewApplicants(item.id)}
                  disabled={this.state.isButtonDisabled}
                >
                  View Applicants{" "}
                </button>
              </article>
            ))}
          </div>
        </main>
      </div>
    );
  }
}
