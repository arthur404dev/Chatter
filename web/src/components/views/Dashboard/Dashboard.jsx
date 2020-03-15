import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/auth.actions";

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;

    return (
      <div className="dashboard">
        <div className="dashboard__message">
          <div className="dashboard__message_welcome welcome">
            <h4 className="welcome__text">
              <b>Hey there,</b> {user.name.split(" ")[0]}
              <p className="welcome__status">You are logged in CHATTER 👏</p>
            </h4>
            <button
              onClick={this.onLogoutClick}
              className="welcome__logout button"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);
