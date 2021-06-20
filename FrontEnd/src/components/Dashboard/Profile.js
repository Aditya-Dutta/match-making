import React, { Component } from "react";
import SideBar from "./SideBar";
import AuthService from "../services/AuthService";
import AuthProfile from "../services/AuthProfile";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      personal_summary: "",
      university: "",
      degree_type: "",
      year_of_grad: "",
      pincode: "",
      category: "",
      username: "",
      currentUser: "",
      profileData: [],
      profileExists: false,
    };

    this.saveProfile = this.saveProfile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (!user) this.setState({ redirect: "/" });
    if (user) {
      this.setState({
        currentUser: user,
        username: user.username,
      });
    }
    console.log(user.username);
    AuthProfile.getProfile(user.username).then((e) => {
      this.setState({
        personal_summary: e.data.summary,
        category: e.data.category,
        year_of_grad: e.data.date_of_graduation,
        degree_type: e.data.degree_type,
        university: e.data.university,
        pincode: e.data.locationPincode,
      });
      if (this.state.category) {
        this.setState({ profileExists: true });
      }
      console.log(this.state.profileExists);
    });
  }

  saveProfile = (e) => {
    e.preventDefault();
    AuthProfile.saveProfile(
      this.state.personal_summary,
      this.state.university,
      this.state.degree_type,
      this.state.year_of_grad,
      this.state.pincode,
      this.state.category,
      this.state.username
    ).then(
      () => {
        alert("Profile created");
        this.props.history.push("/dashboard_seeker");
        window.location.reload();
      },
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
  };

  updateProfile = (e) => {
    e.preventDefault();
    AuthProfile.updateProfile(
      this.state.personal_summary,
      this.state.university,
      this.state.degree_type,
      this.state.year_of_grad,
      this.state.pincode,
      this.state.category,
      this.state.username
    ).then(
      () => {
        alert("Profile Updated");
        this.props.history.push("/dashboard_seeker");
        window.location.reload();
      },
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
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const exists = this.state.profileExists;
    if (exists) {
      this.updateProfile(e);
    } else {
      this.saveProfile(e);
    }
    // console.log(exits);
  };

  render() {
    return (
      <React.Fragment>
        <SideBar active="profile" />
        <main className="profile-body">
          <form className="profile-form" onSubmit={this.handleSubmit}>
            <div className="form-row details-form">
              <div className="personal-summary col-md-8 form-group">
                <h2>Personal Summary</h2>
                <fieldset>
                  <textarea
                    rows="4"
                    cols="50"
                    className="summary-text-area"
                    value={this.state.personal_summary}
                    onChange={(e) =>
                      this.setState({ personal_summary: e.target.value })
                    }
                  ></textarea>
                </fieldset>
              </div>

              <div className="education col-md-8 form-group">
                <h2>Education</h2>
                <fieldset>
                  <div className="form-group">
                    <label for="university">University</label>
                    <input
                      type="text"
                      className="form-control"
                      id="university"
                      name="university"
                      value={this.state.university}
                      onChange={(e) =>
                        this.setState({ university: e.target.value })
                      }
                    />
                    <label for="degree">Degree Type:</label>
                    <select
                      id="degree"
                      className="form-control"
                      onChange={(e) =>
                        this.setState({ degree_type: e.target.value })
                      }
                      value={this.state.degree_type}
                    >
                      <option value="NA">NA</option>
                      <option value="Bachelor's">Bachelor's</option>
                      <option value="Masters">Masters</option>
                      <option value="PHD">PHD</option>
                      <option value="Associate">Associate</option>
                      <option value="Doctoral">Doctoral</option>
                    </select>
                    <label for="school">Year of Graduation</label>
                    <input
                      type="number"
                      min="1990"
                      max="2021"
                      id="year_of_grad"
                      name="year_of_grad"
                      className="form-control w-50"
                      value={this.state.year_of_grad}
                      onChange={(e) =>
                        this.setState({ year_of_grad: e.target.value })
                      }
                    />
                  </div>
                </fieldset>
              </div>
              <div className="form-group col-md-6">
                <h2>Details</h2>
                <label for="field">Field Type:</label>
                <select
                  id="field"
                  className="form-control"
                  onChange={(e) => this.setState({ category: e.target.value })}
                  value={this.state.category}
                >
                  <option value="NA">NA</option>
                  <option value="IT">IT</option>
                  <option value="Art">Art</option>
                  <option value="Medical">Medical</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Education">Education</option>
                </select>
              </div>
              <div className="form-group col-md-8">
                <label for="location-type">Pincode:</label>
                <input
                  id="location-type"
                  type="number"
                  className="form-control"
                  value={this.state.pincode}
                  onChange={(e) => this.setState({ pincode: e.target.value })}
                ></input>
              </div>
              <div className="col-md-6">
                <button className="btn btn-primary submit-created-job">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </main>
      </React.Fragment>
    );
  }
}
