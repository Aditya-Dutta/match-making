import axios from "axios";

import authHeader from './AuthHeader';

const API_URL = "http://localhost:8080/seeker/profile/";

class AuthProfile {


  saveProfile(summary, university, degree_type, date_of_graduation, locationPincode, category, username) {
    return axios.post(API_URL + "saveProfile", {
      summary,
      university,
      degree_type,
      date_of_graduation,
      locationPincode,
      category,
      username
    }, {
      headers: authHeader()
    });
  }


  updateProfile(summary, university, degree_type, date_of_graduation, locationPincode, category, username) {
    return axios.post(API_URL + "updateProfile", {
      summary,
      university,
      degree_type,
      date_of_graduation,
      locationPincode,
      category,
      username
    }, {
      headers: authHeader()
    });
  }


  getProfile(username) {
    return axios.post(API_URL + "getProfile", {
      username
    }, {
      headers: authHeader()
    });
  }

  // viewAllProfile()
  // {
  //   return axios.post(API_URL + "viewAllProfile", {username}, { headers: authHeader() });
  // }



}

export default new AuthProfile();