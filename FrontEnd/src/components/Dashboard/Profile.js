import React, { Component } from "react";
import SideBar from "./SideBar";

export default class Profile extends Component {
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
                <textarea rows="4" cols="50"></textarea>
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
                  />
                  <label for="college">College</label>
                  <input
                    type="text"
                    id="college"
                    name="college"
                    className="form-control w-50"
                  />
                  <label for="school">School</label>
                  <input
                    type="text"
                    id="school"
                    name="school"
                    className="form-control w-50"
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
