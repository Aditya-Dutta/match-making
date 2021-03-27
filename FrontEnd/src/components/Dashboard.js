import React, { Component } from 'react';
import AuthService from "./services/AuthService";

//home page for all users
export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        //  this.logOut = this.logOut.bind(this);
        this.state = {
          currentUser: false,
        };
      }

    componentDidMount() {
        const user = AuthService.getCurrentUser();
        //get the current user type
        if (user) {
          this.setState({
            currentUser: user,
          });
        }
      }

render() {
    const { currentUser } = this.state;
    return (
        <div>
        {currentUser ? (
            <p>Implement Dash Board</p>
          ) : (
            <a className="name-link" href="/">
              <strong>Invalid Access</strong>
            </a>
          )}
          </div>
    )
}
}
