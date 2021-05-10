import React, { Component } from "react";

const JobCard = (props) => {
  console.log(props);
  return (
    <div>
      <div className="col-md-12 my-3">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{props.jobTitle}</h5>
            <h6 className="card-subtitle mb-2 text-muted">
              Category: {props.category}
            </h6>
            <p className="card-text">
              Job Type: {props.jobType} <br />
              Description: {props.jobDescription}
            </p>
            <p className="card-text">
              Pay Type: {props.payType} <br />
              Location Type: {props.locationType}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

//Also implement a APPLY button for users to click 


export default JobCard;
