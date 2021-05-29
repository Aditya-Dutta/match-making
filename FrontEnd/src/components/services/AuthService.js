import axios from "axios";
import authHeader from "./AuthHeader";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  //communicate with the controller
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  //logout user
  logout() {
    localStorage.removeItem("user");
  }

  //register an user
  register(
    firstname,
    lastname,
    address,
    email,
    phone,
    password,
    username,
    user_type
  ) {
    return axios.post(API_URL + "signup", {
      firstname,
      lastname,
      address,
      email,
      phone,
      password,
      username,
      user_type,
    });
  }

  get_user_type(username) {
    return axios.get(
      API_URL + "getType",
      { username },
      { headers: authHeader() }
    );
  }

  deleteAdmin(username) {
    return axios.post(
      API_URL + "deleteAdmin",
      { username },
      { headers: authHeader() }
    );
  }

  add_admin(firstname, lastname, address, email, phone, password, username) {
    return axios.post(API_URL + "addAdmin", {
      firstname,
      lastname,
      address,
      email,
      phone,
      password,
      username,
    });
  }

  viewAllAdmin() {
    return axios.get(API_URL + "viewAllAdmin", { headers: authHeader() });
  }
  //get current user
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
