import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Typography, Card, Button } from "antd";
import { WechatFilled } from "@ant-design/icons";
// Import Scss
import "./Landing.scss";
// Extract Typography variants
const { Title, Paragraph } = Typography;

class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <Card className="container" bordered={false}>
          <div className="container__title">
            <Title className="container__title_text welcome">
              Welcome to Chatter!
            </Title>
            <WechatFilled className="container__title_icon" />
          </div>
          <div className="container__description">
            <Paragraph className="container__description_text description">
              Chat with anybody, anytime, identified, or anonimously.
            </Paragraph>
            <br />
          </div>
          <div className="container__cta">
            <Button
              size="large"
              type="primary"
              className="container__cta_button"
            >
              <Link to="/register" className="container__cta_link register">
                Register
              </Link>
            </Button>
            <Button
              size="large"
              type="primary"
              className="container__cta_button"
            >
              <Link to="/login" className="container__cta_link login">
                Log In
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    );
  }
}

export default Landing;
