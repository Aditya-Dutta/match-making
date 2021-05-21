import React, { Component } from "react";
import AuthService from "../services/AuthService";
import SideBar from "./SideBar";
import Validate from "../utility/FormValidaton";
import AuthEmployer from "../services/AuthEmployer";
import JobCard from "./Card";

export default class Dashboard_Employer extends Component {
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
      currentUser: undefined,
      // employerID: this.state.currentUser.ID,
      showForm: false,
      jobList: [],
    };
    this.saveJob = this.saveJob.bind(this);
    // this.onInputChange = this.onInputChange.bind(this);
    this.handleForm = this.handleForm.bind(this);
  }

  //to the the update of current user
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
    //console.clear();
    //this.state.employerUsername = user.username;
    AuthEmployer.get_top3_jobs(user.username).then((result) => {
      this.setState({ jobList: result.data });
      console.log(result.data);
    });
  }

  saveJob = (e) => {
    e.preventDefault();
    this.setState({
      message: "",
      successful: false,
    });

    {
      // this.clearErrorState();
      const error = Validate(e, this.state);
      if (error) {
        this.setState({
          errors: { ...this.state.errors, ...error },
        });
      } else {
        //pass the values into controller
        AuthEmployer.post_job(
          this.state.jobTitle,
          this.state.locationPincode,
          this.state.payType,
          this.state.category,
          this.state.jobDescription,
          this.state.jobType,
          this.state.skills,
          this.state.currentUser.username
        ).then(
          () => {
            this.props.history.push("/Dashboard_Employer");
            window.location.reload();
            alert("Job Created");
          },
          //else show error
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();

            this.setState({
              successful: false,
              message: resMessage,
            });
          }
        );
      }
    }
  };

  handleForm = (e) => {
    e.preventDefault();
    // Send data to db
    console.log(this.state);
  };

  render() {
    return (
      <React.Fragment>
        <SideBar active="dashboard" />
        <main>
          <div className="component">
            <div className="employer-title">
              {/* {console.log(currentUser.username)} */}
              <h1>{this.state.employerUsername}</h1>
            </div>

            <div className="jobs-created">
              <h2 className="created-title">Recent Jobs Created</h2>
              <div className="row">
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

                {/* <div className="field">
                  <p className="control">
                    <button className="btn btn-primary" onClick={this.saveUser}>
                      Register
                    </button>
                  </p>
                </div> */}
              </div>
            </div>
            {/* <button
              className="btn btn-primary create-btn"
              onClick={() => this.setState({ showForm: true })}
            >
              Create Job
            </button>
          </div>
          {this.state.showForm ? this.showForm() : null} */}
          </div>
        </main>
      </React.Fragment>
    );
  }
}
