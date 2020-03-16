import React from "react";
import { Comment, Tooltip } from "antd";
import moment from "moment";

function ChatCard(props) {
  return (
    <div className="chat__card">
      <Comment
        author={props.sender.name}
        content={<p>{props.message}</p>}
        datetime={
          <Tooltip
            title={moment(props.createdAt).format("YYYY-MM-DD HH:mm:ss")}
          >
            <span>{moment(props.createdAt).fromNow()}</span>
          </Tooltip>
        }
      />
    </div>
  );
}

export default ChatCard;
