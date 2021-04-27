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
      locationType: "",
      skills: "",
      workType: "",
      payType: "",
      category: "",
      jobDescription: "",
      employerID: "",
      //employerID: this.state.currentUser.ID,
      showForm: false,
    };
    // this.saveUser = this.saveUser.bind(this);
    // this.onInputChange = this.onInputChange.bind(this);
    this.handleForm = this.handleForm.bind(this);
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    //get the current user type
    if (user) {
      this.setState({
        currentUser: user,
      });
    }
  }

  //to the the update of current user
  // componentDidMount() {
  //   const currentUser = AuthService.getCurrentUser();
  //   if (!currentUser) this.setState({ redirect: "/" });
  //   //set redirect path is no user found
  //   this.setState({ currentUser: currentUser, userReady: true });
  //   this.setState({ employerID: currentUser.username });
  // }

  //to register user
  saveUser = (e) => {
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
          this.state.location,
          this.state.workType,
          this.state.payType,
          this.state.category,
          this.state.jobDescription,
          this.state.employerID
        ).then(
          () => {
            this.props.history.push("/Dashboard_Employer");
            window.location.reload();
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

  showForm = () => {
    return (
      <div className="create-job-form">
        <form onSubmit={this.saveUser}>
          <h4>Create Job</h4>
          <div className="form-row">
            <div className="form-group col-md-12 col-lg-6">
              <label for="job-title">Job Title:</label>
              <input
                className="form-control"
                type="text"
                id="job-title"
                value={this.state.job_title}
                onChange={(e) => this.setState({ jobTitle: e.target.value })}
              />
            </div>
            <div className="form-group col-md-3">
              <label for="job-type">Job Type:</label>
              <select
                id="job-type"
                class="form-control"
                onChange={(e) => this.setState({ jobType: e.target.value })}
              >
                <option value="Full">Job Type</option>
                <option value="Full">Full Time</option>
                <option value="Part">Part Time</option>
                <option value="Casual">Contract</option>
              </select>
            </div>
            <div className="form-group col-md-3">
              <label for="location-type">Location type:</label>
              <select
                id="location-type"
                class="form-control"
                onChange={(e) =>
                  this.setState({ locationType: e.target.value })
                }
              >
                <option value="Person">Location Type</option>
                <option vaue="Person">In Person</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
            <div className="form-group col-md-6 col-lg-6">
              <label for="category">Category:</label>
              <select
                id="category"
                class="form-control"
                onChange={(e) => this.setState({ category: e.target.value })}
              >
                <option value="">Category</option>
                <option vaue="IT">Information Technology</option>
                <option value="Engineering">Engineering</option>
                <option value="Medical">Medical</option>
                <option value="Art">Art</option>
              </select>
            </div>
            <div className="form-group col-md-3">
              <label for="pay-type">Pay type:</label>
              <select
                id="pay-type"
                class="form-control"
                onChange={(e) => this.setState({ payType: e.target.value })}
              >
                <option value="Hourly">Pay Type</option>
                <option vaue="Person">Hourly</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>
            <div className="form-group col-md-12 col-lg-8">
              <label for="job-description">Description:</label>
              <textarea
                id="job-description"
                className="form-control"
                rows="6"
                cols="40"
                value={this.state.jobDescription}
                onChange={(e) =>
                  this.setState({ jobDescription: e.target.value })
                }
              ></textarea>
            </div>

            <div className="form-group col-md-12 col-lg-8">
              <label for="skills">Skills required:</label>
              <textarea
                id="skills"
                className="form-control"
                rows="6"
                cols="40"
                placeholder="comma separated"
                onChange={(e) => this.setState({ skills: e.target.value })}
              ></textarea>
            </div>
            <div className="col-md-6">
              <button className="btn btn-primary submit-created-job">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  };

  render() {
    return (
      <React.Fragment>
        <SideBar />
        <main>
          <div className="component">
            <div className="employer-title">
              <h1>Employer Name Dashboard</h1>
            </div>

            <div className="jobs-created">
              <h2 className="created-title">Jobs Created</h2>
              <div className="row">
                <JobCard
                  jobTitle="Card 1"
                  jobDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In feugiat massa in leo pretium 
                  consectetur. Nulla a dignissim sem, in placerat eros. Nam a urna in ex suscipit malesuada a quis nisl. Phasellus faucibus commodo rhoncus. Vestibulum mollis congue nibh, sit amet viverra massa tempus a. Quisque ultricies eros ac lorem fermentum consectetur. Morbi quis commodo erat."
                  jobType="Full"
                  locationType="In Person"
                  category="IT"
                  payType="Hourly"
                />
                <JobCard
                  jobTitle="Card 2"
                  jobDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In feugiat massa in leo pretium 
                  consectetur. Nulla a dignissim sem, in placerat eros. Nam a urna in ex suscipit malesuada a quis nisl. Phasellus faucibus commodo rhoncus. Vestibulum mollis congue nibh, sit amet viverra massa tempus a. Quisque ultricies eros ac lorem fermentum consectetur. Morbi quis commodo erat."
                  jobType="Part"
                  locationType="In Person"
                  category="Medical"
                  payType="Hourly"
                />
                <JobCard
                  jobTitle="Card 3"
                  jobDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In feugiat massa in leo pretium 
                  consectetur. Nulla a dignissim sem, in placerat eros. Nam a urna in ex suscipit malesuada a quis nisl. Phasellus faucibus commodo rhoncus. Vestibulum mollis congue nibh, sit amet viverra massa tempus a. Quisque ultricies eros ac lorem fermentum consectetur. Morbi quis commodo erat."
                  jobType="Casual"
                  locationType="Remote"
                  category="Art"
                  payType="Monthly"
                />

                {/* <div className="field">
                  <p className="control">
                    <button className="btn btn-primary" onClick={this.saveUser}>
                      Register
                    </button>
                  </p>
                </div> */}
              </div>
            </div>
            <button
              className="btn btn-primary create-btn"
              onClick={() => this.setState({ showForm: true })}
            >
              Create Job
            </button>
          </div>
          {this.state.showForm ? this.showForm() : null}
        </main>
      </React.Fragment>
    );
  }
}
