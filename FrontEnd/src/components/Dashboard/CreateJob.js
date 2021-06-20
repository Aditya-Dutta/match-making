import React, { Component } from "react";
import SideBar from "./SideBar";
import AuthService from "../services/AuthService";
import Validate from "../utility/FormValidaton";
import AuthEmployer from "../services/AuthEmployer";

export default class CreateJob extends Component {
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
    };

    this.saveJob = this.saveJob.bind(this);
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
    // AuthSeeker.get_job().then((result) => {
    //   this.setState({ jobList: result.data });
    //   console.log(result.data);
    // });
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
        // This will pass data to the API and data will be stored in the db
        // appropriately.
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
        <SideBar active="create" />
        <main>
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
                    onChange={(e) =>
                      this.setState({ jobTitle: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="form-group col-md-3">
                  <label for="job-type">Job Type:</label>
                  <select
                    id="job-type"
                    className="form-control"
                    onChange={(e) => this.setState({ jobType: e.target.value })}
                    required
                  >
                    <option value="NA">Job Type</option>
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Casual">Casual</option>
                  </select>
                </div>

                <div className="form-group col-md-3">
                  <label for="location-type">Pincode:</label>
                  <input
                    id="location-type"
                    type="number"
                    className="form-control"
                    value={this.state.locationPincode}
                    onChange={(e) =>
                      this.setState({ locationPincode: e.target.value })
                    }
                    required
                  ></input>
                </div>

                <div className="form-group col-md-6 col-lg-6">
                  <label for="category">Category:</label>
                  <select
                    id="category"
                    className="form-control"
                    onChange={(e) =>
                      this.setState({ category: e.target.value })
                    }
                    required
                  >
                    <option value="">Category</option>
                    <option vaue="Information Technology">
                      Information Technology
                    </option>
                    <option value="Engineering">Engineering</option>
                    <option value="Medical">Medical</option>
                    <option value="Art">Art</option>
                    <option value="Education">Education</option>
                  </select>
                </div>

                <div className="form-group col-md-3">
                  <label for="pay-type">Pay type:</label>
                  <select
                    id="pay-type"
                    className="form-control"
                    onChange={(e) => this.setState({ payType: e.target.value })}
                    required
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
                    required
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
        </main>
      </React.Fragment>
    );
  }
}
