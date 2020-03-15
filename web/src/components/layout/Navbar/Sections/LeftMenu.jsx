import React, { Component } from "react";
import { Menu } from "antd";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
class LeftMenu extends Component {
  render() {
    return (
      <Menu mode="horizontal">
        <Menu.Item key="mail">
          <a href="/">Home</a>
        </Menu.Item>
        <SubMenu title={<span>Rooms</span>}>
          <MenuItemGroup title="Code">
            <Menu.Item key="setting:1">
              <a href="/chat/javascript">Javascript</a>
            </Menu.Item>
            <Menu.Item key="setting:2">Python</Menu.Item>
          </MenuItemGroup>
          <MenuItemGroup title="Stocks">
            <Menu.Item key="setting:3">Predictions</Menu.Item>
            <Menu.Item key="setting:4">Bidding</Menu.Item>
          </MenuItemGroup>
        </SubMenu>
        <Menu.Item key="alipay">
          <a href="/chat">Live Chat</a>
        </Menu.Item>
      </Menu>
    );
  }
}
export default LeftMenu;
