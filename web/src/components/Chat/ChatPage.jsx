import React, { Component } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import io from "socket.io-client";
import { connect } from "react-redux";
import moment from "moment";
import { getChats, afterPostMessage } from "../../actions/chat.actions";
import ChatCard from "./ChatCard";
import "./ChatPage.scss";

class ChatPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatMessage: ""
    };
  }

  componentDidMount() {
    let server = "http://localhost:5555";

    this.props.dispatch(getChats());

    this.socket = io(server);

    this.socket.on("Output Chat Message", messageFromBackEnd => {
      this.props.dispatch(afterPostMessage(messageFromBackEnd));
    });
  }

  componentDidUpdate() {}

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
      <div className="chat">
        <div className="container">
          <div className="infinite-container">
            {this.props.chats.chats
              ? this.props.chats.chats.map(el => (
                  <ChatCard key={el._id} {...el} />
                ))
              : null}
            <div
              ref={el => {
                this.messagesEnd = el;
              }}
              style={{ float: "left", clear: "both" }}
            />
          </div>
          <p style={{ fontSize: "2rem", textAlign: "center" }}> Live Chat</p>
        </div>

        <div>
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
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    chats: state.chat
  };
};

export default connect(mapStateToProps)(ChatPage);
