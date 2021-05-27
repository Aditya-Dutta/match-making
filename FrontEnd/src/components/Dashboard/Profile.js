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
      college: "",
      school: "",
      degree_type: "",
      year_of_grad: "",
      pincode: "",
      category: "",
      username: "",
      currentUser: "",
      profileData: [],
    };

    this.saveProfile = this.saveProfile.bind(this);
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
      this.setState({ profileData: e.data });
      console.log(e.data);
    });
    console.log(this.state.profileData);
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

  render() {
    return (
      <React.Fragment>
        <SideBar />
        <main>
          <form onSubmit={this.saveProfile}>
            <div className="form-row">
              <div className="personal-summary col-md-8 form-group">
                <h2>Personal Summary</h2>
                <p>Display by default and let them update later</p>
                <fieldset>
                  <legend>Personal Summary</legend>
                  <textarea
                    rows="4"
                    cols="50"
                    value={this.state.personal_summary}
                    onChange={(e) =>
                      this.setState({ personal_summary: e.target.value })
                    }
                  ></textarea>
                </fieldset>
              </div>

              <div className="education col-md-8 form-group">
                <h2>Education</h2>
                <p>
                  {this.state.profileData.map((item) => (
                    <p>{item.university}</p>
                  ))}
                </p>
                <fieldset>
                  <div className="form-group">
                    <legend>Education</legend>
                    <label for="university">University</label>
                    <input
                      type="text"
                      id="university"
                      name="university"
                      className="form-control w-50"
                      value={this.state.university}
                      onChange={(e) =>
                        this.setState({ university: e.target.value })
                      }
                    />
                    <label for="college">Degree Type</label>
                    <input
                      type="text"
                      id="degree"
                      name="degree"
                      className="form-control w-50"
                      value={this.state.degree}
                      onChange={(e) =>
                        this.setState({ degree_type: e.target.value })
                      }
                    />
                    <label for="school">Year of Graduation</label>
                    <input
                      type="text"
                      id="year_of_grad"
                      name="year_of_grad"
                      className="form-control w-50"
                      value={this.state.year_of_grad}
                      onChange={(e) =>
                        this.setState({ year_of_grad: e.target.value })
                      }
                    />
                  </div>{" "}
                </fieldset>
              </div>
              <div className="form-group col-md-6">
                <h2>Details</h2>
                <label for="field">Field Type:</label>
                <select
                  id="field"
                  class="form-control"
                  onChange={(e) => this.setState({ category: e.target.value })}
                >
                  <option value="NA">NA</option>
                  <option value="IT">IT</option>
                  <option value="Art">Art</option>
                  <option value="Medical">Medical</option>
                  <option value="Commerce">Commerce</option>
                </select>
              </div>
              <div className="form-group col-md-8">
                <label for="location-type">Pincode:</label>
                <input
                  id="location-type"
                  class="form-control"
                  value={this.state.pincode}
                  onChange={(e) => this.setState({ pincode: e.target.value })}
                ></input>
              </div>
            </div>
            <div className="col-md-6">
              <button className="btn btn-primary submit-created-job">
                Submit
              </button>
            </div>
          </form>
        </main>
      </React.Fragment>
    );
  }
}
