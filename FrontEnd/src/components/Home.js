import React, { Fragment } from "react";

//home page for all users
export default function Home() {
  return (
    <Fragment>
      <div className="home-section">
        <img src="/home_page-image.jpg" alt="" className="home-pg-img" />
        <div className="title-div">
          <h1 className="title">Jaxlooper</h1>
          <h2 className="tag-line">Find the right job for you</h2>
        </div>
        <div className="link-div">
          <a className="home-btn body-hov" href="/login">
            Login
          </a>
          <a className="home-btn body-hov" href="/login">
            Register
          </a>
        </div>
      </div>
    </Fragment>
  );
}
