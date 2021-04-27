import axios from "axios";

import authHeader from './AuthHeader';

const API_URL = "http://localhost:8080/job/employer/";

class AuthEmployer {
    
    

    //register an user
    post_job(jobTitle, locationPincode, payType, category, jobDescription, jobType, skills, employerUsername)
    {
        return axios.post(API_URL + "postjob", {
            jobTitle,
            locationPincode,
            payType, 
            category, 
            jobDescription, 
            jobType, 
            skills, 
            employerUsername
        },{ headers: authHeader() }
        );
    }

}

export default new AuthEmployer();