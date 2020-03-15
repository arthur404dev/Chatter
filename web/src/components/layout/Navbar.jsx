import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <div className="navbar">
        <nav className="navbar__left">
          <div className="navbar__left_logo logo">
            <Link to="/" className="logo__link">
              CHATTER
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
