import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../../actions/auth.actions";
import { Form, Input, Button, Card, Typography } from "antd";
import { BackwardFilled } from "@ant-design/icons";

// Import Styling
import "./Login.scss";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/chat");
    }
  }

  componentDidUpdate(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/chat");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    // e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {
    return (
      <div className="login">
        <Card className="login__container" bordered={false}>
          <Link to="/" className="login__container_back">
            <BackwardFilled /> Back to home
          </Link>
          <div className="login__container_header header">
            <Typography.Title className="header__title">
              <b>Login</b> below
            </Typography.Title>
            <Typography.Paragraph className="header__register">
              Don't have an account? <Link to="/register">Register</Link>
            </Typography.Paragraph>
          </div>
          <Form
            noValidate
            onFinish={this.onSubmit}
            className="login__form form"
          >
            <Form.Item
              name="email"
              rules={[{ required: true }]}
              className="form__inputs"
            >
              <Input
                onChange={this.onChange}
                value={this.state.email}
                id="email"
                type="email"
                placeholder="E-mail"
              />
            </Form.Item>
            <Form.Item name="password" className="form__input_password">
              <Input.Password
                onChange={this.onChange}
                value={this.state.password}
                id="password"
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item className="form__submit">
              <Button
                type="primary"
                htmlType="submit"
                className="form__submit_button"
                block
                size="large"
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { loginUser })(Login);
