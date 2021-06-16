import React, { Component } from "react";
import SideBar from "./SideBar";
import AuthService from "../services/AuthService";
import Donut from "react-donut";

export default class Dashboard_admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: undefined,
      admin: 0,
      employee: 0,
      employer: 0
    };
  }

   async componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) this.setState({ redirect: "/" });

    this.setState({ username: currentUser.username });

     await AuthService.getAdminCount().then((result)  => {
       this.setState({
        admin: result.data
      });
      console.log(this.state.admin);
      
    });
    console.log(this.state.admin);
    

    await  AuthService.getEmployeesCount().then((result) => {
       this.setState({
        employee: result.data
      });
    });
    console.log(this.state.employee);

     await AuthService.getEmployersCount().then((result) => {
         this.setState({
        employer: result.data
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
            <Donut
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
            />
          </div>

          
        </main>
      </React.Fragment>
    );
  }
}
