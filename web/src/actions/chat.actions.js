import axios from "axios";
import { GET_ERRORS, GET_CHATS, AFTER_POST_MESSAGE } from "./types";
import { CHAT_SERVER } from "../configs/setupVariables";

export const getChats = () => dispatch => {
  axios
    .get(`${CHAT_SERVER}/getChats`)
    .then(res => {
      //   Retrieve posts Data
      const data = res.data;
      dispatch(feedChats(data));
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

export const afterPostMessage = data => dispatch => {
  dispatch(refreshChat(data));
};

export const feedChats = data => {
  return {
    type: GET_CHATS,
    payload: data
  };
};

export const refreshChat = data => {
  return {
    type: AFTER_POST_MESSAGE,
    payload: data
  };
};
