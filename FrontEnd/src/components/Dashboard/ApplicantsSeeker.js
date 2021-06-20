import React, { Component } from "react";
import AuthEmployer from "../services/AuthEmployer";
import AuthService from "../services/AuthService";
import SideBar from "./SideBar";

export default class ApplicantsSeeker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: undefined,
      employerUsername: "",
      applicants: [],
      isButtonDisabled: false,
      profileList: [],
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
    console.log(this.props.location.state.job_id);

    AuthEmployer.getApplicantUser(this.props.location.state.job_id).then(
      (result) => {
        this.setState({ userList: result.data });
        console.log(result.data);
      }
    );
  }

  viewProfile = (values) => {
    this.setState({
      isButtonDisabled: true,
    });

    this.props.history.push({
      pathname: "/dashboard/view_applicants_profile",
      state: {
        username: values.username,
        job_id: this.props.location.state.job_id,
      },
    });
  };

  render() {
    return (
      <div>
        <SideBar active="applicants" />
        <main>
          <h1>Applicants</h1>
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
                  onClick={() => this.viewProfile(item)}
                  disabled={this.state.isButtonDisabled}
                >
                  View Profile{" "}
                </button>
              </article>
            ))}
          </div>
        </main>
      </div>
    );
  }
}
