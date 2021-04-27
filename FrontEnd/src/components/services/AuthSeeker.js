import axios from "axios";

import authHeader from './AuthHeader';

const API_URL = "http://localhost:8080/job/seeker/";

class AuthSeeker {
    

    get_job() {
        return axios.get(API_URL + "/getjob", { headers: authHeader() });
    }


}

export default new AuthSeeker();
