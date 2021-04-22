import React, { Component } from "react";
import AuthService from "../services/AuthService";
import SideBar from "./SideBar";
import Validate from "../utility/FormValidaton";
import AuthEmployer from "../services/AuthEmployer";

export default class Dashboard_Employer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      jobTitle:"DEMO",
            location:"DEMO",
            workType:"DEMO", 
            payType:"DEMO", 
            payMinimum:"DEMO", 
            payMaximum:"DEMO", 
            payInfo:"DEMO", 
            category:"DEMO", 
            jobDescription:"DEMO",
           employerID: "",
            //employerID: this.state.currentUser.ID,
            
            showForm: false
    };
    // this.saveUser = this.saveUser.bind(this);
    // this.onInputChange = this.onInputChange.bind(this);
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
componentDidMount() {
  const currentUser = AuthService.getCurrentUser();
  if (!currentUser) this.setState({ redirect: "/" });
  //set redirect path is no user found
  this.setState({ currentUser: currentUser, userReady: true })
  this.setState({ employerID: currentUser.username})

  
}


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
      if (
        error
      ) {
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
          this.state.payMinimum, 
          this.state.payMaximum, 
          this.state.payInfo, 
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




















  showForm = () => {
    return (
      <div className="create-job-form">
        <form>
          <h4>Create Job</h4>
          <div className="form-row">
            <div className="form-group col-md-12 col-lg-6">
              <label for="job-title">Job Title:</label>
              <input
                className="form-control"
                type="text"
                id="job-title"
                value={this.state.job_title}
                onChange={this.onInputChange}
              />
            </div>
            <div className="form-group col-md-3">
              <label for="job-type">Job Type:</label>
              <select id="job-type" class="form-control">
                <option selected>Job Type</option>
                <option>Full Time</option>
                <option>Part Time</option>
                <option>Contract</option>
              </select>
            </div>
            <div className="form-group col-md-3">
              <label for="location-type">Location type:</label>
              <select id="location-type" class="form-control">
                <option selected>Location Type</option>
                <option>In Person</option>
                <option>Remote</option>
              </select>
            </div>
            <div className="form-group col-md-12 col-lg-6">
              <label for="job-description">Description:</label>
              <textarea
                id="job-description"
                className="form-control"
                rows="6"
                cols="40"
              ></textarea>
            </div>
            
            <div className="form-group col-md-12 col-lg-6">
              <label for="skills">Skills required:</label>
              <textarea
                id="skills"
                className="form-control"
                rows="6"
                cols="40"
                placeholder="comma separated"
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
                <div className="col-md-3">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">Card title</h5>
                      <h6 class="card-subtitle mb-2 text-muted">
                        Card subtitle
                      </h6>
                      <p class="card-text">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </p>
                      <a href="#1" class="card-link">
                        Card link
                      </a>
                      <a href="#1" class="card-link">
                        Another link
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">Card title</h5>
                      <h6 class="card-subtitle mb-2 text-muted">
                        Card subtitle
                      </h6>
                      <p class="card-text">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </p>
                      <a href="#1" class="card-link">
                        Card link
                      </a>
                      <a href="#1" class="card-link">
                        Another link
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">Card title</h5>
                      <h6 class="card-subtitle mb-2 text-muted">
                        Card subtitle
                      </h6>
                      <p class="card-text">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </p>
                      <a href="#1" class="card-link">
                        Card link
                      </a>
                      <a href="#1" class="card-link">
                        Another link
                      </a>
                    </div>
                  </div>
                </div>
                <div className="field">
                  <p className="control">
                    <button className="btn btn-primary" onClick={this.saveUser}>
                      Register
                    </button>
                  </p>
                </div>
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
