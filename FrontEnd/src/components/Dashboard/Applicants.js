import React, { Component } from "react";
import AuthEmployer from "../services/AuthEmployer";
import AuthService from "../services/AuthService";
import SideBar from "./SideBar";
import JobCard from "./Card";

export default class Applicants extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      currentUser: undefined,
      employerUsername: "",
      applicants: [],
      isButtonDisabled: false,
      jobList: [],
      job_id: undefined
    };

  }
  componentDidMount() {
    // console.log(this.state);
    // const lister = [];
    // this.state.jobList.forEach((job) =>
    //   AuthEmployer.getApplicants(job.id).then((result) => {
    //     console.log(result.data);
    //     lister.push(result.data);
    //   })
    // );
    const user = AuthService.getCurrentUser();
    if (!user) this.setState({ redirect: "/" });
    //set redirect path is no user found

    if (user) {
      this.setState({
        currentUser: user,
        employerUsername: user.username,
      });
    }

    AuthEmployer.get_all_jobs(user.username).then((result) => {
      this.setState({ jobList: result.data });
      console.log(result.data);
    });

    //this.setState({ applicants: lister });
    console.log(this.state.applicants);
  }

  
  viewApplicants = (values ) =>
    {
      this.setState({
        isButtonDisabled: true,
        job_id: values
      });

      this.props.history.push({
        pathname: '/dashboard/view_applicants',
        state: {job_id: values}  
    })
      console.log(values)
    }

  

  
  render() {
   
   
    return (
      
      
      <div>
         
        <SideBar active="applicants" />
        <main>
        <h1 >Jobs</h1>
          <div className="component">
          {this.state.jobList.map((item) => (
                
                 <article className="job-card">
                   <div className="job-title">{item.jobTitle}</div>
                   <div className="category">{item.category} </div>
                   <div className="description">{item.jobDescription}</div>
                   <div className="skills-container">
                     <div className="skill">Pay: {item.payType}</div>
                     <div className="skill">Job Type: {item.jobType}</div>
                     <div className="skill">Location: {item.locationPincode}</div>
                   </div>
                   
                   <button className="apply" onClick={() => this.viewApplicants(item.id)}  disabled={this.state.isButtonDisabled}>View Applicants </button>
                 </article>
              
                ))}
          </div>
        </main>
      </div>
    );
  }
}
