import React, { Component } from "react";
import AuthService from "../services/AuthService";
import SideBar from "./SideBar";
import AuthSeeker from "../services/AuthSeeker";

export default class AdminEmployee extends Component {
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
    AuthSeeker.viewAllSeeker().then((result) => {
      this.setState({ userList: result.data });
    });
    // console.log(this.props.location.state.job_id);
    // AuthProfile.getProfile(this.props.location.state.username).then(
    //     (result)=>{
    //         this.setState({ profileList: result.data });
    //         console.log(result.data);
    //     }
    // );
  }

  viewAppliedJobs(values) {
    // this.props.history.push("/dashboard/view_applicants");
    this.props.history.push({
      pathname: "/dashboard/admin/seeker/jobs",
      state: { username: values },
    });
  }

  render() {
    return (
      <div>
        <SideBar active="admin_employee" />
        <main>
          <h2>All Job Seekers</h2>
          <div className="component">
            {this.state.userList.map((item) => (
              <article className="job-card">
                <div className="job-title">
                  {item.firstname} {item.lastname}
                </div>
                <div className="category">Username: {item.username}</div>
                <div className="description">Address: {item.address} </div>
                <div className="skills-container">
                  <div className="skill">Email: {item.email}</div>
                  <div className="skill">Phone: {item.phone}</div>
                </div>

                <button
                  className="apply"
                  onClick={() => this.viewAppliedJobs(item.username)}
                  disabled={this.state.isButtonDisabled}
                >
                  View applied jobs{" "}
                </button>
              </article>
            ))}
          </div>
        </main>
      </div>
    );
  }
}
