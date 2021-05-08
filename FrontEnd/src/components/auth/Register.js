import React, { Component } from "react";
import FormErrors from "../FormErrors";
import Validate from "../utility/FormValidaton";
import AuthService from "../services/AuthService";
import TermsConditions from "./termsConditions";

export class RegisterCustomerComponent extends Component {
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
    };
    this.saveUser = this.saveUser.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.popUp = this.popUp.bind(this);
    this.showForm = this.showForm.bind(this);
  }

  //assign values for this state
  onInputChange = (event) => {
    this.setState({
      fields: event.target.value,
    });

    if (event.target.id === "email") {
      if (this.state.fields !== "") {
        let lastAtPos = this.state.fields.lastIndexOf("@");
        let lastDotPos = this.state.fields.lastIndexOf(".");
        if (
          !(
            lastAtPos < lastDotPos &&
            lastAtPos > 0 &&
            this.state.fields.indexOf("@@") === -1 &&
            lastDotPos > 2 &&
            this.state.fields.length - lastDotPos > 2
          )
        ) {
          this.setState({
            errors_message_email: "Email is not valid",
          });
        } else {
          this.setState({
            errors_message_email: "",
          });
        }
      }
    }
    if (event.target.id === "password") {
      var pattern = new RegExp(
        /^((?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{7,}$)/i
      );
      if (!pattern.test(this.state.fields)) {
        this.setState({
          errors_message_password: "Password not valid.",
        });
      } else {
        this.setState({
          errors_message_password: "",
        });
      }
    }

    if (event.target.id === "phone") {
      var phone_pattern = new RegExp(
        /(\(+61\)|\+61|\(0[1-9]\)|0[1-9])?( ?-?[0-9]){6,9}/i
      );
      if (!phone_pattern.test(this.state.fields)) {
        this.setState({
          errors_message_phone: "Phone not valid.",
        });
      } else {
        this.setState({
          errors_message_phone: "",
        });
      }
    }

    this.setState({
      [event.target.id]: event.target.value,
    });
    console.clear();
    console.log(this.state);
    // document.getElementById(event.target.id).classList.remove("is-danger");
  };

  //clear error states
  clearErrorState = () => {
    this.setState({
      errors: {
        blankfield: false,
      },
    });
  };

  //to register user
  saveUser = (e) => {
    e.preventDefault();
    this.setState({
      message: "",
      successful: false,
    });

    console.log(this.state);

    {
      this.clearErrorState();
      const error = Validate(e, this.state);
      if (
        error ||
        this.state.errors_message_email !== "" ||
        this.state.errors_message_password !== "" ||
        this.state.errors_message_phone !== ""
      ) {
        this.setState({
          errors: { ...this.state.errors, ...error },
        });
      } else {
        //pass the values into controller
        AuthService.register(
          this.state.firstname,
          this.state.lastname,
          this.state.address,
          this.state.email,
          this.state.phone,
          this.state.password,
          this.state.username,
          this.state.user_type
        ).then(
          () => {
            //if success, navigate to profile page
            AuthService.login(this.state.username, this.state.password).then(
              () => {
                if (this.state.user_type === "EMPLOYER") {
                  this.props.history.push("/Dashboard_Employer");
                  window.location.reload();
                } else {
                  this.props.history.push("/Dashboard_Seeker");
                  window.location.reload();
                }

                // window.location.replace("http://localhost:3000/");
              }
            );
          },
          //else show error
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
      }
    }
  };

  popUp() {
    <TermsConditions />;
  }

  showForm = () => {
    return (
      <section className="register-section">
        <div className="register">
          <h1 className="register-title">Register</h1>
          <div className="text-danger">
            <FormErrors formerrors={this.state.errors} />
          </div>

          <form>
            <div className="form-row">
              <div class="form-group col-md-6">
                <label for="username">Username: </label>
                <div className="input-group register-input-fields">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      {" "}
                      <i class="fa fa-user-circle" aria-hidden="true"></i>
                    </span>
                  </div>

                  <input
                    className="form-control"
                    type="name"
                    id="username"
                    placeholder="username"
                    value={this.state.username}
                    onChange={this.onInputChange}
                  />
                </div>
              </div>

              <div class="form-group col-md-6">
                <label for="firstname">First Name: </label>
                <div className="input-group register-input-fields">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      {" "}
                      <i className="fas fa-user"></i>
                    </span>
                  </div>
                  <input
                    className="form-control"
                    type="name"
                    id="firstname"
                    placeholder="first name"
                    value={this.state.firstname}
                    onChange={this.onInputChange}
                  />
                </div>
              </div>

              <div class="form-group col-md-6">
                <label for="lastname">Last Name: </label>
                <div class="input-group register-input-fields">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      {" "}
                      <i className="fas fa-user"></i>
                    </span>
                  </div>
                  <input
                    className="form-control"
                    type="name"
                    id="lastname"
                    aria-describedby="userNameHelp"
                    placeholder="last name"
                    value={this.state.lastname}
                    onChange={this.onInputChange}
                  />
                </div>
              </div>

              <div class="form-group col-md-6">
                <label for="email">Email: </label>
                <div className="input-group register-input-fields">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      {" "}
                      <i className="fas fa-envelope"></i>
                    </span>
                  </div>
                  <input
                    className="form-control"
                    type="email"
                    id="email"
                    aria-describedby="emailHelp"
                    placeholder="email"
                    value={this.state.email}
                    onChange={this.onInputChange}
                  />
                </div>
                <small id="passwordHelpBlock" class="form-text text-danger">
                  {this.state.errors_message_email}{" "}
                </small>
              </div>

              <div class="form-group col-md-12">
                <label for="address">Address: </label>
                <div className="input-group register-input-fields">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      {" "}
                      <i className="fas fa-home"></i>
                    </span>
                  </div>
                  <input
                    className="form-control"
                    type="address"
                    id="address"
                    aria-describedby="addressHelp"
                    placeholder="Enter Address"
                    value={this.state.address}
                    onChange={this.onInputChange}
                  />
                </div>
              </div>

              <div class="form-group col-md-6">
                <label for="phone">Phone No: </label>
                <div className="input-group register-input-fields">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      {" "}
                      <i className="fas fa-phone"></i>
                    </span>
                  </div>
                  <input
                    className="form-control"
                    type="phone"
                    id="phone"
                    aria-describedby="phoneHelp"
                    placeholder="Enter Phone"
                    value={this.state.phone}
                    onChange={this.onInputChange}
                  />
                </div>
                <small class="form-text text-danger">
                  {this.state.errors_message_phone}{" "}
                </small>
              </div>
              <div class="form-group col-md-6">
                <label for="phone">User Type: </label>
                <div className="input-group register-input-fields">
                  <label className="Seeker">
                    <input
                      className="radio-inline"
                      type="radio"
                      name="userType"
                      onChange={(e) => this.setState({ user_type: "SEEKER" })}
                    />
                    Job Seeker
                  </label>

                  <label className="Employer">
                    <input
                      className="radio-inline"
                      type="radio"
                      name="userType"
                      onChange={(e) => this.setState({ user_type: "EMPLOYER" })}
                    />
                    Employer
                  </label>
                </div>
              </div>

              <div class="form-group col-md-6">
                <label for="password">Password: </label>
                <div className="input-group register-input-fields">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      {" "}
                      <i className="fas fa-lock"></i>
                    </span>
                  </div>
                  <input
                    className="form-control"
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.onInputChange}
                  />
                  <small class="form-text text-muted">
                    Password must contain at least one UpperCase, one LowerCase,
                    one Digit, one Special character and minimum 8 character
                    length.
                  </small>
                  <small class="form-text text-danger">
                    {this.state.errors_message_password}{" "}
                  </small>
                </div>
              </div>

              <div class="form-group col-md-6">
                <div className="field">
                  <p className="control">
                    <a href="/login">Already a user?</a>
                  </p>
                </div>

                <div className="field">
                  <p className="control">
                    <button className="btn btn-primary" onClick={this.saveUser}>
                      Register
                    </button>
                  </p>
                </div>
              </div>

              {this.state.message && (
                <div className="form-group mt-2">
                  <div
                    className={
                      this.state.successful
                        ? "alert alert-success mt-2"
                        : "alert alert-danger mt-2 "
                    }
                    role="alert"
                  >
                    {this.state.message}
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      </section>
    );
  };

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="box">
            <TermsConditions />
            <form onSubmit={this.showForm}>
              <input type="checkbox" id="agree" name="agree" value="agree" />
              <label for="agree">Agree</label>
              <button className="btn btn-primary submit-created-job">
                Submit
              </button>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default RegisterCustomerComponent;
