import axios from "axios";

import authHeader from "./AuthHeader";

const API_URL = "http://localhost:8080/job/seeker";

class AuthSeeker {
  get_job() {
    return axios.get(API_URL + "/getjob", { headers: authHeader() });
  }

  find_by_category(category) {
    return axios.post(
      API_URL + "/category",
      { category },
      { headers: authHeader() }
    );
  }

  find_by_location(locationPincode) {
    return axios.post(
      API_URL + "/location",
      { locationPincode },
      { headers: authHeader() }
    );
  }

  find_by_jobType(jobType) {
    return axios.post(
      API_URL + "/job_type",
      { jobType },
      { headers: authHeader() }
    );
  }

  find_all_search(jobType, category, locationPincode) {
    return axios.post(
      API_URL + "/findall",
      { jobType, category, locationPincode },
      { headers: authHeader() }
    );
  }

  apply_job(id, username) {
    return axios.post(
      API_URL + "/applyJob",
      { id, username },
      { headers: authHeader() }
    );
  }

  getAppliedJobs(username) {
    return axios.post(
      API_URL + "/getAppliedJobs",
      { username },
      { headers: authHeader() }
    );
  }

  viewAllSeeker() {
    return axios.get(API_URL + "/viewAllSeeker", { headers: authHeader() });
  }

  deleteSeeker(username) {
    return axios.post(
      API_URL + "/deleteSeeker",
      { username },
      { headers: authHeader() }
    );
  }
}

export default new AuthSeeker();
