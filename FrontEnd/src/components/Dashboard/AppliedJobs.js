import React, { Component } from "react";
import SideBar from "./SideBar";
import JobCard from "./Card";
import AuthSeeker from "../services/AuthSeeker";
import AuthService from "../services/AuthService";

export default class AppliedJobs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: undefined,
      jobList: [],
      jobTitle: "",
    };
    // console.log(props);
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (!user) this.setState({ redirect: "/" });
    //set redirect path is no user found

    if (user) {
      this.setState({
        username: user.username,
      });
    }
    // console.log(user.username);
    AuthSeeker.getAppliedJobs(user.username).then((result) => {
      this.setState({ jobList: result.data });
      console.log(result.data);
    });
  }

  render() {
    return (
      <React.Fragment>
        <SideBar active="appJobs" />
        <main>
          <h2>You have applied for: </h2>
          {this.state.jobList.length === 0 ? (
            <p>You have not applied yet</p>
          ) : (
            this.state.jobList.map((item) => (
              <JobCard
                jobTitle={item.jobTitle}
                jobDescription={item.jobDescription}
                jobType={item.jobType}
                locationType={item.locationPincode}
                category={item.category}
                payType={item.payType}
              />
            ))
          )}
        </main>
      </React.Fragment>
    );
  }
}
