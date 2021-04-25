import React, { Component } from "react";
import SideBar from "./SideBar";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      personal_summary: "",
      university: "",
      college: "",
      school: "",
    };
  }

  render() {
    return (
      <React.Fragment>
        <SideBar />
        <main>
          <div className="personal-summary">
            <h2>Personal Summary</h2>
            <p>Display by default and let them update later</p>
            <fieldset>
              <form>
                <legend>Personal Summary</legend>
                <textarea
                  rows="4"
                  cols="50"
                  value={this.state.personal_summary}
                  onChange={(e) =>
                    this.setState({ personal_summary: e.target.value })
                  }
                ></textarea>
              </form>
            </fieldset>
          </div>

          <div className="education">
            <h2>Education</h2>
            <p>Display by default and let them update later</p>
            <fieldset>
              <form>
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
                  <label for="college">College</label>
                  <input
                    type="text"
                    id="college"
                    name="college"
                    className="form-control w-50"
                    value={this.state.college}
                    onChange={(e) => this.setState({ college: e.target.value })}
                  />
                  <label for="school">School</label>
                  <input
                    type="text"
                    id="school"
                    name="school"
                    className="form-control w-50"
                    value={this.state.school}
                    onChange={(e) => this.setState({ school: e.target.value })}
                  />
                </div>
              </form>
            </fieldset>
          </div>
        </main>
      </React.Fragment>
    );
  }
}
