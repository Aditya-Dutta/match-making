import React, { Component } from "react";
import FormErrors from "../FormErrors";
import Validate from "../utility/FormValidaton";
import AuthService from "../services/AuthService";
import TermsConditions from "./termsConditions";

class RegisterCustomerComponent extends Component {
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
      validationCheck: false,
    };
    this.saveUser = this.saveUser.bind(this);
    // this.onInputChange = this.onInputChange.bind(this);
    this.checkValidate = this.checkValidate.bind(this);
    this.handleAgree = this.handleAgree.bind(this);
  }

  checkValidate = (field) => {
    if (field.target.id === "password") {
      var pattern = new RegExp(
        /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
      );
      if (pattern.test(field.target.value)) {
        this.setState({ errors_message_password: "" });
      } else {
        this.setState({ errors_message_password: "Password not valid" });
      }
    }
    if (field.target.id === "phone") {
      var p_pattern = new RegExp(/^([\d]{8,13})$/);
      if (p_pattern.test(field.target.value)) {
        this.setState({ errors_message_phone: "" });
      } else {
        this.setState({ errors_message_phone: "Number not valid" });
      }
    }

    console.log(this.state.user_type);
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
    // const validate = this.checkValidate(e);
    this.setState({
      message: "",
      successful: false,
    });

    // console.log("Validation " + this.state.validationCheck);
    // this.clearErrorState();
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
          AuthService.login(this.state.username, this.state.password).then(
            () => {
              if (this.state.user_type == "EMPLOYER") {
                this.props.history.push("/Dashboard_Employer");
                window.location.reload();
              } else if (this.state.user_type == "SEEKER") {
                console.log(this.state.user_type);
                this.props.history.push("/Dashboard_Seeker");
                window.location.reload();
              }
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
  };

  showForm = () => {
    return (
      <div>
        <section className="register-section">
          <div className="register">
            <h1 className="register-title">Register</h1>
            <div className="text-danger">
              <FormErrors formerrors={this.state.errors} />
            </div>

            <form onSubmit={this.saveUser}>
              <div className="form-row">
                <div class="form-group col-md-6">
                  <label for="username">Username: </label>
                  <div className="input-group register-input-fields">
                    <div className="input-group-prepend">
                      <span className="input-group-text icon-size">
                        {" "}
                        <i class="fa fa-user-circle" aria-hidden="true"></i>
                      </span>
                    </div>

                    <input
                      className="form-control"
                      type="text"
                      id="username"
                      placeholder="username"
                      value={this.state.username}
                      onInput={this.checkValidate}
                      onChange={(e) =>
                        this.setState({ username: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div class="form-group col-md-6">
                  <label for="firstname">First Name: </label>
                  <div className="input-group register-input-fields">
                    <div className="input-group-prepend">
                      <span className="input-group-text icon-size">
                        {" "}
                        <i className="fas fa-user"></i>
                      </span>
                    </div>
                    <input
                      className="form-control"
                      type="text"
                      id="firstname"
                      placeholder="first name"
                      value={this.state.firstname}
                      onInput={this.checkValidate}
                      onChange={(e) =>
                        this.setState({ firstname: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div class="form-group col-md-6">
                  <label for="lastname">Last Name: </label>
                  <div class="input-group register-input-fields">
                    <div className="input-group-prepend">
                      <span className="input-group-text icon-size">
                        {" "}
                        <i className="fas fa-user"></i>
                      </span>
                    </div>
                    <input
                      className="form-control"
                      type="text"
                      id="lastname"
                      aria-describedby="userNameHelp"
                      placeholder="last name"
                      value={this.state.lastname}
                      onInput={this.checkValidate}
                      onChange={(e) =>
                        this.setState({ lastname: e.target.value })
                      }
                      required
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
                      onInput={this.checkValidate}
                      onChange={(e) => this.setState({ email: e.target.value })}
                      required
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
                      <span className="input-group-text icon-size">
                        {" "}
                        <i className="fas fa-home"></i>
                      </span>
                    </div>
                    <input
                      className="form-control"
                      type="text"
                      id="address"
                      aria-describedby="addressHelp"
                      placeholder="Enter Address"
                      value={this.state.address}
                      onInput={this.checkValidate}
                      onChange={(e) =>
                        this.setState({ address: e.target.value })
                      }
                      required
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
                      onInput={this.checkValidate}
                      onChange={(e) => this.setState({ phone: e.target.value })}
                      required
                    />
                  </div>
                  <small class="form-text text-muted">
                    Phone no between 8-13 digits no characters.
                  </small>
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
                        onChange={(e) =>
                          this.setState({ user_type: "EMPLOYER" })
                        }
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
                      onInput={this.checkValidate}
                      onChange={(e) =>
                        this.setState({ password: e.target.value })
                      }
                      required
                    />
                    <small class="form-text text-muted">
                      Password must contain at least one UpperCase, one
                      LowerCase, one Digit, one Special character and minimum 8
                      character length.
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
                      <button
                        className="btn btn-primary"
                        // onClick={this.saveUser}
                        type="submit"
                      >
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
      </div>
    );
  };

  handleAgree = () => {
    var agree = document.querySelector("#agree");
    if (agree.checked) {
      this.setState({ showForm: true });
      var box = document.querySelector(".box");
      // console.log(box);
      box.style.display = "none";
    } else {
      alert("Please click agree");
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="box">
            <TermsConditions />
            <input
              type="checkbox"
              id="agree"
              name="agree"
              value="agree"
              // onClick={this.handleCheck}
            />
            <label for="agree" className="agreeLabel">
              Agree
            </label>
            <button
              className="btn btn-primary submit-created-job submitTerms"
              onClick={this.handleAgree}
            >
              Submit
            </button>
          </div>
          {this.state.showForm ? this.showForm() : null}
        </div>
      </React.Fragment>
    );
  }
}

export default RegisterCustomerComponent;
