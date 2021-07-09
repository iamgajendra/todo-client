import axios from "axios";
import authHeader from "./auth-header";

const user = JSON.parse(localStorage.getItem("user"));
const API_URL = " https://agile-journey-07058.herokuapp.com/api/list/";
// change to "http://localhost:5000/api/list/" for running locally

const getList = () => {
  return axios.get(API_URL, { headers: authHeader() });
};

const postListItem = (title, description) => {
  return axios.post(
    API_URL + "create",
    {
      itemTitle: title,
      itemDescription: description,
    },
    {
      headers: authHeader(),
    }
  );
};

const deleteListItem = (id) => {
  return axios.delete(
    API_URL + "deleteItem",
    {
      headers: {
        'auth-token': user.accessToken,
        'Content-type':'application/json' 
      },
      data : {
        itemId: id,
      }
    }
  );
};

const toggleListItem = (itemId, completed) => {
  return axios.put(
    API_URL + "updateStatus",
    {
      itemId: itemId,
      completed: completed,
    },
    {
      headers: authHeader(),
    }
  );
};

export default {
  getList,
  postListItem,
  deleteListItem,
  toggleListItem,
};
