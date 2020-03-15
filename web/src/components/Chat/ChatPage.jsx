import React, { Component } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import io from "socket.io-client";
import { connect } from "react-redux";
import moment from "moment";
import "./ChatPage.scss";

export class ChatPage extends Component {
  state = {
    chatMessage: ""
  };

  componentDidMount() {
    let server = "http://localhost:5555";

    this.socket = io(server);

    this.socket.on("Output Chat Message", messageFromBackEnd => {
      console.log(messageFromBackEnd);
    });
  }

  handleSearchChange = e => {
    this.setState({
      chatMessage: e.target.value
    });
  };

  submitChatMessage = e => {
    e.preventDefault();
    const { user } = this.props.auth;

    let chatMessage = this.state.chatMessage;
    let userId = user.id;
    let userName = user.name;
    let nowTime = moment();
    let type = "Message";

    this.socket.emit("Input Chat Message", {
      chatMessage,
      userId,
      userName,
      nowTime,
      type
    });
    this.setState({ chatMessage: "" });
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <p style={{ fontSize: "2rem", textAlign: "center" }}> Live Chat</p>
        </div>

        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div className="infinite-container">
            {/* {this.props.chats && (
                            <div>{this.renderCards()}</div>
                        )} */}
            <div
              ref={el => {
                this.messagesEnd = el;
              }}
              style={{ float: "left", clear: "both" }}
            />
          </div>

          <Row>
            <Form layout="inline" onFinish={this.submitChatMessage}>
              <Col span={18}>
                <Input
                  id="message"
                  placeholder="Let's start talking"
                  type="text"
                  value={this.state.chatMessage}
                  onChange={this.handleSearchChange}
                />
              </Col>
              <Col span={2}></Col>

              <Col span={4}>
                <Button
                  type="primary"
                  style={{ width: "100%" }}
                  onClick={this.submitChatMessage}
                  htmlType="submit"
                >
                  Enter
                </Button>
              </Col>
            </Form>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(ChatPage);
