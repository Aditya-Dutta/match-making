import React, { Component } from "react";
import AuthService from "../services/AuthService";
import SideBar from "./SideBar";
import AuthSeeker from "../services/AuthSeeker";

export default class AdminSeekerJobs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: undefined,
      employerUsername: "",
      applicants: [],
      isButtonDisabled: false,
      userList: [],
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
    AuthSeeker.getAppliedJobs(this.props.location.state.username).then(
      (result) => {
        this.setState({ userList: result.data });
      }
    );
    // console.log(this.props.location.state.job_id);
    // AuthProfile.getProfile(this.props.location.state.username).then(
    //     (result)=>{
    //         this.setState({ profileList: result.data });
    //         console.log(result.data);
    //     }
    // );
  }

  Back() {
    this.props.history.push("/dashboard/view_admin_employees");
    // this.props.history.push({
    //     pathname: '/dashboard/view_applicants',
    //     state: {username: values},
    // })
  }

  render() {
    return (
      <div>
        <SideBar active="admin_employee" />
        <main>
          <h2> Jobs Applied by {this.props.location.state.username} </h2>
          <div className="component">
            {this.state.userList.map((item) => (
              <article className="job-card">
                <div className="job-title">{item.jobTitle}</div>
                <div className="category">{item.category} </div>
                <div className="description">{item.jobDescription}</div>
                <div className="skills-container">
                  <div className="skill">Pay: {item.payType}</div>
                  <div className="skill">Job Type: {item.jobType}</div>
                  <div className="skill">Location: {item.locationPincode}</div>
                </div>
              </article>
            ))}
          </div>

          <button
            type="button "
            onClick={() => this.Back()}
            disabled={this.state.isButtonDisabled}
            class="btn btn-outline-info text-center"
          >
            Back
          </button>
        </main>
      </div>
    );
  }
}
