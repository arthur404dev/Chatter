import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/auth.actions";
import { Typography, Card, Button } from "antd";
import { WechatFilled } from "@ant-design/icons";
// Import Styles
import "./Logout.scss";
class Logout extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;

    return (
      <div className="logout">
        <Card className="container" bordered={false}>
          <div className="container__title">
            <Typography.Title className="container__title_text welcome">
              {`Done Chatting? ${user.name}`}
            </Typography.Title>
            <WechatFilled className="container__title_icon" />
          </div>
          <div className="container__description">
            <Typography.Paragraph className="container__description_text description">
              You can Logout using the button below! Thanks for using Chatter
            </Typography.Paragraph>
            <br />
          </div>
          <div className="container__cta">
            <Button
              type="danger"
              size="large"
              onClick={this.onLogoutClick}
              className="welcome__logout button"
            >
              Logout
            </Button>
          </div>
        </Card>
      </div>
    );
  }
}

Logout.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Logout);
