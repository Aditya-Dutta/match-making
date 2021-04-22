import React, { Component } from "react";

export default class SideBar extends Component {
  render() {
    return (
      <div class="sidenav">
        <a href="/dashboard">Dashboard</a>
        <a href="/dashboard/profile">Profile</a>
        <a href="#p">Saved Jobs</a>
        <a href="#s">Applied Jobs</a>
      </div>
    );
  }
}
