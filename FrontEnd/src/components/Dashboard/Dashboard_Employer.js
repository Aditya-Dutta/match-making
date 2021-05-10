import React, { Component } from "react";
import AuthService from "../services/AuthService";
import SideBar from "./SideBar";
import Validate from "../utility/FormValidaton";
import AuthEmployer from "../services/AuthEmployer";
import JobCard from "./Card";
import AuthSeeker from "../services/AuthSeeker";

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

  showForm = () => {
    return (
      <div className="create-job-form">
        <form onSubmit={this.saveJob}>
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
            {/* {this.state.employerUsername=this.state.currentUser.getCurrentUser} */}

            <div className="form-group col-md-3">
              <label for="job-type">Job Type:</label>
              <select
                id="job-type"
                class="form-control"
                onChange={(e) => this.setState({ jobType: e.target.value })}
              >
                <option value="NA">Job Type</option>
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Casual">Casual</option>
              </select>
            </div>
            {/* <div className="form-group col-md-3">
              <label for="location-type">Location type:</label>
              <select
                id="location-type"
                class="form-control"
                onChange={(e) =>
                  this.setState({ locationPincode: e.target.value })
                }
              >
                <option value="Person">Location Type</option>
                <option vaue="Person">In Person</option>
                <option value="Remote">Remote</option>
              </select>
            </div> */}

            <div className="form-group col-md-3">
              <label for="location-type">Pincode:</label>
              <input
                id="location-type"
                class="form-control"
                value={this.state.locationPincode}
                onChange={(e) =>
                  this.setState({ locationPincode: e.target.value })
                }
              ></input>
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
