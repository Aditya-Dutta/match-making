import React, { Component } from "react";
import AuthEmployer from "../services/AuthEmployer";
import AuthService from "../services/AuthService";
import SideBar from "./SideBar";

export default class Applicants extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: undefined,
      employerUsername: "",
      applicants: [],
      jobList: [],
    };

    const user = AuthService.getCurrentUser();
    if (!user) this.setState({ redirect: "/" });
    //set redirect path is no user found

    if (user) {
      this.setState({
        currentUser: user,
        employerUsername: user.username,
      });
    }

    // console.log(user.id);

    AuthEmployer.get_all_jobs(user.username).then((result) => {
      this.setState({ jobList: result.data });
      console.log(result.data);
    });
  }

  componentDidMount() {
    // console.log(this.state);
    const lister = [];
    this.state.jobList.forEach((job) =>
      AuthEmployer.getApplicants(job.id).then((result) => {
        console.log(result.data);
        lister.push(result.data);
      })
    );
    this.setState({ applicants: lister });
    console.log(this.state.applicants);
  }

  //   componentDidUpdate() {
  //     // console.log(this.state.jobList);
  //     // Job Id
  //     const lister = [];
  //     this.state.jobList.forEach((job) =>
  //       AuthEmployer.getApplicants(job.id).then((result) => {
  //         console.log(result.data);
  //         lister.push(result.data);
  //       })
  //     );
  //     // this.setState({ applicants: lister });
  //   }

  render() {
    return (
      <div>
        <SideBar active="applicants" />
        <main>
          <div className="component">
            <h1>{this.state.applicants}</h1>
          </div>
        </main>
      </div>
    );
  }
}
