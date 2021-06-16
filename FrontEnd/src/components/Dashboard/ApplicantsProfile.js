import React, { Component } from "react";
import AuthEmployer from "../services/AuthEmployer";
import AuthService from "../services/AuthService";
import SideBar from "./SideBar";
import JobCard from "./Card";
import AuthProfile from "../services/AuthProfile";

export default class ApplicantsProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: undefined,
      employerUsername: "",
      applicants: [],
      isButtonDisabled: false,
      profileList: [],
      userList: [],
    };
  }
  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (!user) this.setState({ redirect: "/" });

    if (user) {
      this.setState({
        currentUser: user,
        employerUsername: user.username,
      });
    }
    console.log(this.props.location.state.job_id);
    AuthProfile.getProfile(this.props.location.state.username).then(
        (result)=>{
            this.setState({ profileList: result.data });
            console.log(result.data);
        }
    );
  }

  Back()
  {
   // this.props.history.push("/dashboard/view_applicants");
    this.props.history.push({
        pathname: '/dashboard/view_applicants',
        state: {job_id: this.props.location.state.job_id},  
    })
   

   
  }

  

  render() {
    return (
      <div>
        <SideBar active="applicants" />
        <main>
        <h2 >Profile Details</h2>
        <div className="component">
         
                
                 <article className="job-card">
                   <div className="job-title">{this.state.profileList.degree_type} Degree</div>
                   <div className="category">Date Of Graduation: {this.state.profileList.date_of_graduation}</div>
                   <div className="description">Summary: {this.state.profileList.summary} </div>
                   <div className="skills-container">
                     <div className="skill">Location: {this.state.profileList.locationPincode}</div>
                     <div className="skill">Date Of Graduation: {this.state.profileList.date_of_graduation}</div>

                   </div>
                   
                   <button className="apply" onClick={() => this.Back()}  disabled={this.state.isButtonDisabled}>Back </button>
                 </article>
              
               
          </div>


          
        </main>
      </div>
    );
  }
}
