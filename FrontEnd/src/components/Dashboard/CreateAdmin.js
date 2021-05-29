import React, { Component } from "react";
import SideBar from "./SideBar";
import AuthService from "../services/AuthService";
import Validate from "../utility/FormValidaton";
import AuthEmployer from "../services/AuthEmployer";
import AuthSeeker from "../services/AuthSeeker";

export default class CreateAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: "",
      lastname: "",
      address: "",
      phone: "",
      email: "",
      username: "",
      user_type: "",
      password: "",
      successful: false,
      message: "",
      errors_message_password: "",
      errors_message_email: "",
      fields: {},
      errors_message_phone: "",
      showForm: "",
    };

    this.handleForm = this.handleForm.bind(this);
  }

  componentDidMount() {
    // console.log(this.state);
    const user = AuthService.getCurrentUser();
    if (!user) this.setState({ redirect: "/" });
    //set redirect path is no user found

    // if (user) {
    //   this.setState({
    //     currentUser: user,
    //     employerUsername: user.username,
    //     showEmployeeBoard: user.roles.includes("ROLE_EMPLOYEE"),
    //     showAdminBoard: user.roles.includes("ROLE_ADMIN"),
    //   });
    // }
  }

  handleForm = (e) => {
    e.preventDefault();
    AuthService.add_admin(
      this.state.firstname,
      this.state.lastname,
      this.state.address,
      this.state.email,
      this.state.phone,
      this.state.username,
      this.state.password
    ).then(
      () => {
        alert("Admin added");
      },
      (error) => {
        alert("Error with for details");
        // const resMessage =
        //   (error.response &&
        //     error.response.data &&
        //     error.response.data.message) ||
        //   error.message ||
        //   error.toString();

        // this.setState({
        //   successful: false,
        //   message: resMessage,
        // });
      }
    );
    // console.log(this.state);
  };

  render() {
    return (
      <React.Fragment>
        <SideBar active="create" />
        <main>
          <form onSubmit={this.handleForm}>
            <h4 className="admin-title">Create Admin</h4>
            <div className="form-row admin-form">
              <div className="form-group col-md-6">
                <label for="firstname">Firstname</label>
                <input
                  type="text"
                  placeholder="Firstname"
                  id="firstname"
                  className="form-control"
                  onChange={(e) => this.setState({ firstname: e.target.value })}
                  required
                />
              </div>
              <div className="form-group col-md-6">
                <label for="lastname">Lastname</label>
                <input
                  type="text"
                  placeholder="Lastname"
                  id="lastname"
                  className="form-control"
                  onChange={(e) => this.setState({ lastname: e.target.value })}
                  required
                />
              </div>
              <div className="form-group col-md-12">
                <label for="inputAddress">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputAddress"
                  placeholder="1234 Main St"
                  onChange={(e) => this.setState({ address: e.target.value })}
                  required
                />
              </div>
              <div className="form-group col-md-6">
                <label for="inputEmail4">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail4"
                  onChange={(e) => this.setState({ email: e.target.value })}
                  required
                />
              </div>
              <div className="form-group col-md-6">
                <label for="phone">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  onChange={(e) => this.setState({ phone: e.target.value })}
                  required
                />
              </div>
              <div className="form-group col-md-6">
                <label for="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  onChange={(e) => this.setState({ username: e.target.value })}
                  required
                />
              </div>
              <div className="form-group col-md-6">
                <label for="pwd">Password</label>
                <input
                  type="text"
                  className="form-control"
                  id="pwd"
                  onChange={(e) => this.setState({ password: e.target.value })}
                  required
                />
              </div>
              <div className="form-group col-md-6">
                <button type="submit" className="btn btn-primary">
                  Add Admin
                </button>
              </div>
            </div>
          </form>
        </main>
      </React.Fragment>
    );
  }
}