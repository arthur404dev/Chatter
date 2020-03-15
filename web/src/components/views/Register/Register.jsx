import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../../actions/auth.actions";
import classnames from "classnames";
import { Form, Input, Button, Card, Typography } from "antd";
import { BackwardFilled } from "@ant-design/icons";

// Import Styling
import "./Register.scss";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: ""
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentDidUpdate(nextProps) {
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
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    return (
      <div className="register">
        <Card className="register__container">
          <Link to="/" className="register__container_back">
            <BackwardFilled className="material-icons left" />
            Back to home
          </Link>
          <div className="register__container_header header">
            <Typography.Title className="header__title">
              <b>Register</b> below
            </Typography.Title>
            <Typography.Paragraph className="header__login">
              Already have an account? <Link to="/login">Log in</Link>
            </Typography.Paragraph>
          </div>
          <Form
            noValidate
            onFinish={this.onSubmit}
            className="register__form form"
          >
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Please fill your Name" }]}
              className="form__input_name"
            >
              <Input
                onChange={this.onChange}
                value={this.state.name}
                id="name"
                type="text"
                placeholder="Full Name"
              />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                { type: "email", message: "That's not a valid E-mail!" },
                {
                  required: true,
                  message: "Please input your E-mail Address!"
                }
              ]}
              className="form__input_email"
            >
              <Input
                onChange={this.onChange}
                value={this.state.email}
                id="email"
                type="email"
                placeholder="E-mail"
              />
            </Form.Item>
            <Form.Item
              name="password"
              className="form__input_password"
              rules={[
                { required: true, message: "Please fill your Password!" }
              ]}
              hasFeedback
            >
              <Input.Password
                onChange={this.onChange}
                value={this.state.password}
                id="password"
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item
              name="password2"
              className="form__input__confirm"
              dependencies={["password"]}
              hasFeedback
              rules={[
                { required: true, message: "Please Confirm Your Password!" },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      "The two passwords that you entered do not match!"
                    );
                  }
                })
              ]}
            >
              <Input.Password
                onChange={this.onChange}
                value={this.state.password2}
                id="password2"
                type="password"
                placeholder="Confirm Password"
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
                Register
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
