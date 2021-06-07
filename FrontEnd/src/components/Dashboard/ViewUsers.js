import React, { Component } from "react";
import SideBar from "./SideBar";
import AuthService from "../services/AuthService";
import AuthSeeker from "../services/AuthSeeker";
import AuthEmployer from "../services/AuthEmployer";
import UsersCard from "../utility/UsersCard";

export default class ViewUsers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: undefined,
      all_users: [],
      all_admins: [],
      all_employers: [],
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) this.setState({ redirect: "/" });

    this.setState({ username: currentUser.username });

    AuthSeeker.viewAllSeeker().then((result) => {
      this.setState({ all_users: result.data });
      // console.log(result.data);
    });

    AuthEmployer.viewAllEmployers().then((result) => {
      this.setState({ all_employers: result.data });
      console.log(result.data);
    });

    AuthService.viewAllAdmin().then((result) => {
      this.setState({ all_admins: result.data });
      // console.log(result.data);
    });

    // var listOFUsers = AuthSeeker.viewAllSeeker();
    // console.log(listOFUsers);
  }

  render() {
    return (
      <React.Fragment>
        <SideBar active="viewUsers" />
        <main>
          {this.state.all_users.map((item) => (
            <UsersCard
              userType="Admin"
              username={item.username}
              user_type={item.user_type}
              address={item.address}
              phone={item.phone}
              email={item.email}
              firstname={item.firstname}
              lastname={item.lastname}
            />
          ))}
          {this.state.all_employers.map((item) => (
            <UsersCard
              userType="Admin"
              username={item.username}
              user_type={item.user_type}
              address={item.address}
              phone={item.phone}
              email={item.email}
              firstname={item.firstname}
              lastname={item.lastname}
            />
          ))}
          {this.state.all_admins.map((item) => (
            <UsersCard
              userType="Admin"
              username={item.username}
              user_type={item.user_type}
              address={item.address}
              phone={item.phone}
              email={item.email}
              firstname={item.firstname}
              lastname={item.lastname}
            />
          ))}
        </main>
      </React.Fragment>
    );
  }
}
