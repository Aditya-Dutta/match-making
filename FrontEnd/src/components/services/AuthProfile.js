import axios from "axios";

import authHeader from "./AuthHeader";

// const API_URL = "https://prog-pp1.herokuapp.com/seeker/profile/";
const API_URL = "http://localhost:8080/seeker/profile/";

// This is the axios class that is used to connect with the API.
class AuthProfile {
  saveProfile(
    summary,
    university,
    degree_type,
    date_of_graduation,
    locationPincode,
    category,
    username
  ) {
    return axios.post(
      API_URL + "saveProfile",
      {
        summary,
        university,
        degree_type,
        date_of_graduation,
        locationPincode,
        category,
        username,
      },
      {
        headers: authHeader(),
      }
    );
  }

  updateProfile(
    summary,
    university,
    degree_type,
    date_of_graduation,
    locationPincode,
    category,
    username
  ) {
    return axios.post(
      API_URL + "updateProfile",
      {
        summary,
        university,
        degree_type,
        date_of_graduation,
        locationPincode,
        category,
        username,
      },
      {
        headers: authHeader(),
      }
    );
  }

  getProfile(username) {
    return axios.post(
      API_URL + "getProfile",
      {
        username,
      },
      {
        headers: authHeader(),
      }
    );
  }

  // viewAllProfile()
  // {
  //   return axios.post(API_URL + "viewAllProfile", {username}, { headers: authHeader() });
  // }
}

export default new AuthProfile();
