import React, { Component } from "react";
import JobCard from "./Card";
import SideBar from "./SideBar";
import AuthService from "../services/AuthService";
import AuthSeeker from "../services/AuthSeeker";
import AuthEmployer from "../services/AuthEmployer";

export default class Jobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: undefined,
      jobTitle: "",
      jobType: "",
      locationPincode: "",
      skills: "",
      workType: "",
      payType: "",
      category: "",
      jobDescription: "",
      employerUsername: "",
      showForm: false,
      jobList: [],
    };
  }

  componentDidMount() {
    // console.log(this.state);
    const user = AuthService.getCurrentUser();
    if (!user) this.setState({ redirect: "/" });
    //set redirect path is no user found

    if (user) {
      this.setState({
        currentUser: user,
        employerUsername: user.username,
        showEmployeeBoard: user.roles.includes("ROLE_EMPLOYEE"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
    // console.clear();
    AuthEmployer.get_all_jobs(user.username).then((result) => {
      this.setState({ jobList: result.data });
      console.log(result.data);
    });
  }

  render() {
    return (
      <React.Fragment>
        <main>
          <SideBar />
          {this.state.jobList.map((item) => (
            <JobCard
              jobTitle={item.jobTitle}
              jobDescription={item.jobDescription}
              jobType={item.jobType}
              locationType={item.locationPincode}
              category={item.category}
              payType={item.payType}
            />
          ))}
        </main>
      </React.Fragment>
    );
  }
}
