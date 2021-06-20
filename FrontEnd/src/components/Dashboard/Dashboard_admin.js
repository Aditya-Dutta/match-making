import React, { Component } from "react";
import SideBar from "./SideBar";
import AuthService from "../services/AuthService";

export default class Dashboard_admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: undefined,
      admin: 0,
      employee: 0,
      employer: 0,
    };
  }

  async componentDidMount() {
    // Get the current user
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) this.setState({ redirect: "/" });

    this.setState({ username: currentUser.username });
    // Gets the number of admins in the system
    await AuthService.getAdminCount().then((result) => {
      this.setState({
        admin: result.data,
      });
      console.log(this.state.admin);
    });
    console.log(this.state.admin);
    // Gets the number of seekers in the system
    await AuthService.getEmployeesCount().then((result) => {
      this.setState({
        employee: result.data,
      });
    });
    console.log(this.state.employee);
    // Gets the number of employers in the system
    await AuthService.getEmployersCount().then((result) => {
      this.setState({
        employer: result.data,
      });
    });
    console.log(this.state.employer);
  }

  render() {
    const { admin, employee, employer } = this.state;
    return (
      <React.Fragment>
        <SideBar active="dashboard" />
        <main>
          <div className="App">
            <h1>Adminstrator</h1>

            <div class="container mt-4 ml-0">
              <div class="row">
                <div class="col-sm-3">
                  <div class="card border-info mb-3">
                    <div class="card-body text-info">
                      <h5 class="card-title">Admin</h5>
                      <h1 class="card-text text-dark">{admin}</h1>
                    </div>
                  </div>
                </div>
                <div class="col-sm-3">
                  <div class="card border-info mb-3">
                    <div class="card-body text-info">
                      <h5 class="card-title">Employers</h5>
                      <h1 class="card-text text-dark">{employer}</h1>
                    </div>
                  </div>
                </div>
                <div class="col-sm-3">
                  <div class="card border-info mb-3">
                    <div class="card-body text-info">
                      <h5 class="card-title">Job Seekers</h5>
                      <h1 class="card-text text-dark">{employee}</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}
