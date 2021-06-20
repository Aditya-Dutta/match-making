import React, { Component } from "react";
import AuthEmployer from "../services/AuthEmployer";
import AuthService from "../services/AuthService";
import SideBar from "./SideBar";

export default class AdminEmployer extends Component {
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

    AuthEmployer.viewAllEmployers().then((result) => {
      this.setState({ empList: result.data });
      console.log(result.data);
    });

    //console.log(this.props.location.state.job_id);
    // AuthProfile.getProfile(this.props.location.state.username).then(
    //     (result)=>{
    //         this.setState({ profileList: result.data });
    //         console.log(result.data);
    //     }
    // );
  }

  viewProfile(values) {
    // this.props.history.push("/dashboard/view_applicants");
    this.props.history.push({
      pathname: "/dashboard/admin/employer/jobs",
      state: { username: values.username },
    });
  }

  render() {
    return (
      <div>
        <SideBar active="admin_employer" />
        <main>
          <h2>All Employers</h2>
          <div className="component">
            {this.state.empList.map((item) => (
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
                  View Jobs{" "}
                </button>
              </article>
            ))}
          </div>
        </main>
      </div>
    );
  }
}
