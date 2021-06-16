import React, { Component } from "react";
import AuthSeeker from "../services/AuthSeeker";
import AuthService from "../services/AuthService";
import SideBar from "./SideBar";
import JobCard from "./Card";

//home page for all users
export default class Dashboard_Seeker extends Component {
  constructor(props) {
    super(props);

    //  this.logOut = this.logOut.bind(this);
    this.state = {
      jobList: [],
      currentUser: false,
      job_type: "",
      category: "",
      locationPincode: "",
      currentUser: undefined,
      skilld: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) this.setState({ redirect: "/" });

    this.setState({ currentUser: currentUser.username, userReady: true });

    // console.log(currentUser.roles);
    AuthSeeker.get_job().then((result) => {
      this.setState({
        jobList: result.data,
      });
      // console.log(result);
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log("Function called");
    AuthSeeker.find_all_search(
      this.state.job_type,
      this.state.category,
      this.state.locationPincode,
      this.state.currentUser
    ).then((result) => {
      this.setState({ jobList: result.data });
      // console.log(result);
    });
  }

  render() {
    const { currentUser } = this.state;
    return (
      <React.Fragment>
        <SideBar active="dashboard" />
        <main>
          <h1 className="dashboard-heading">Dashboard</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="job-search-div">
              <select
                // onChange={this.handleDropDown}
                className="btn text-info dropdown-toggle mr-5"
                aria-label=".form-select-sm example"
                id="job_type"
                onChange={(e) => this.setState({ job_type: e.target.value })}
              >
                <option value="Full">Job Type</option>
                <option value="Full">Full Time</option>
                <option value="Part">Part Time</option>
                <option value="Casual">Casual</option>
              </select>
              <select
                className="btn text-info dropdown-toggle mr-5"
                aria-label=".form-select-sm example"
                id="category"
                onChange={(e) => this.setState({ category: e.target.value })}
              >
                <option value="IT">Category</option>
                <option vaue="IT">Information Technology</option>
                <option value="Engineering">Engineering</option>
                <option value="Medical">Medical</option>
                <option value="Art">Art</option>
              </select>
              <input
                className="form-control w-50 location-input"
                type="text"
                placeholder="Location"
                aria-label="location"
                onChange={(e) =>
                  this.setState({ locationPincode: e.target.value })
                }
              />
              <button type="submit" className="btn btn-success">
                Find
              </button>
            </div>
          </form>

          {this.state.jobList.map((item) => (
            <JobCard
              jobTitle={item.jobTitle}
              jobDescription={item.jobDescription}
              jobType={item.jobType}
              locationType={item.locationPincode}
              category={item.category}
              payType={item.payType}
              jobId={item.id}
              username={this.state.currentUser}
              skills={item.skills}
              userType="Seeker"
            />
          ))}
        </main>

        {/* {currentUser ? (
          <p>Implement Dash Board</p>
        ) : (
          <a className="name-link" href="/">
            <strong>Invalid Access</strong>
          </a>
        )}  Implement Later */}
      </React.Fragment>
    );
  }
}
