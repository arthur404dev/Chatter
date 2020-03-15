import React, { Component } from "react";
import LeftMenu from "./Sections/LeftMenu";
import RightMenu from "./Sections/RightMenu";
import { Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
// Import Scss
import "./Navbar.scss";

class Navbar extends Component {
  state = {
    current: "mail",
    visible: false
  };
  showDrawer = () => {
    this.setState({
      visible: true
    });
  };
  onClose = () => {
    this.setState({
      visible: false
    });
  };
  render() {
    return (
      <nav className="navBar">
        <div className="navBar__logo">
          <a className="navBar__logo_link" href="/">
            chatter
          </a>
        </div>
        <div className="navBar__menu menu">
          <div className="menu__left">
            <LeftMenu />
          </div>
          <div className="menu__right">
            <RightMenu />
          </div>
          <Button
            className="menu__btn"
            type="primary"
            onClick={this.showDrawer}
            icon={<MenuOutlined />}
          />
          <Drawer
            title="Menu"
            placement="right"
            closable={false}
            onClose={this.onClose}
            visible={this.state.visible}
            className="menu__drawer"
          >
            <LeftMenu className="menu__drawer_item" />
            <RightMenu className="menu__drawer_item" />
          </Drawer>
        </div>
      </nav>
    );
  }
}
export default Navbar;
