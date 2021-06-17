import React, { Component } from "react";
import SideBar from "./SideBar";
import AuthService from "../services/AuthService";
//import Donut from "react-donut";

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
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) this.setState({ redirect: "/" });

    this.setState({ username: currentUser.username });

    await AuthService.getAdminCount().then((result) => {
      this.setState({
        admin: result.data,
      });
      console.log(this.state.admin);
    });
    console.log(this.state.admin);

    await AuthService.getEmployeesCount().then((result) => {
      this.setState({
        employee: result.data,
      });
    });
    console.log(this.state.employee);

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
                      <h5 class="card-title">Emoloyers</h5>
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

            {/* <Donut
            title= "Total User"
              chartData={[
                { name: "Admin", data: admin+10 },
                { name: "Job Seeker", data: employee+7 },
                { name: "Job Employer", data: employer+8 },
              ]}
              chartWidth={500}
              chartHeight={500}
              chartThemeConfig={{
                series: {
                  colors: ["#ffe0bd", "#0080ff", "#6cbfce"],
                },
              }}
            /> */}
          </div>
        </main>
      </React.Fragment>
    );
  }
}
