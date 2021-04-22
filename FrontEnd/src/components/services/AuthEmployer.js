import axios from "axios";

import authHeader from './AuthHeader';

const API_URL = "http://localhost:8080/job/employer/";

class AuthEmployer {
    



    //register an user
    post_job(jobTitle, location, workType, payType, payMinimum, payMaximum, payInfo, category, jobDescription,employerID)
    {
        return axios.post(API_URL + "postjob", {
            jobTitle,
            location,
            workType, 
            payType, 
            payMinimum, 
            payMaximum, 
            payInfo, 
            category, 
            jobDescription,
            employerID
        },{ headers: authHeader() }
        );
    }

}

export default new AuthEmployer();
