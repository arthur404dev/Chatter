import React, { Component } from "react";
import { connect } from "react-redux";
import { Menu, Typography } from "antd";
import { logoutUser } from "../../../../actions/auth.actions";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
class RightMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false
    };
  }

  render() {
    const { user, isAuthenticated } = this.props.auth;
    // If User is Not Authenticated
    if (!isAuthenticated) {
      return (
        <Menu mode="horizontal">
          <Menu.Item key="login">
            <a href="/login">Log-in</a>
          </Menu.Item>
          <Menu.Item key="register">
            <a href="/register">Register</a>
          </Menu.Item>
        </Menu>
      );
    } else {
      return (
        <Menu mode="horizontal">
          <Menu.Item key="user">
            <Typography className="user">
              Logged as: <b>{user.name.split(" ")[0]}</b>
            </Typography>
          </Menu.Item>
          <Menu.Item key="logout">
            <a href="/dashboard">Log-out</a>
          </Menu.Item>
        </Menu>
      );
    }
  }
}

const mapStateToProps = state => ({ auth: state.auth });
export default connect(mapStateToProps, { logoutUser })(RightMenu);
