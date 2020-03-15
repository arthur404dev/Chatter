import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <div className="container">
          <div className="container__title">
            <h4 className="container__title_text welcome">
              Welcome to Chatter!
            </h4>
          </div>
          <div className="container__description">
            <p className="container__description_text description">
              Chat with anybody, anytime, identified, or anonimously.
            </p>
            <br />
          </div>
          <div className="container__cta">
            <Link to="/register" className="container__cta_button register">
              Register
            </Link>
            <Link to="/login" className="container__cta_button login">
              Log In
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
