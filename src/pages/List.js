import React, { useState, useEffect } from "react";
import userService from "../services/user.service";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import AddIcon from "@material-ui/icons/Add";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import HourglassEmptyOutlinedIcon from "@material-ui/icons/HourglassEmptyOutlined";
import UserService from "../services/user.service";
import { Modal } from "antd";
import "antd/dist/antd.css";
import "./css/List.css";

const List = () => {
  const [content, setContent] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    UserService.getList().then(
      (response) => {
        setContent(response.data);
        console.log(response.data);
        setLoader(false)
      },
      (error) => {
        console.log(error);
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);
  const handleDelete = (itemId) => {
    console.log(itemId);
    userService
      .deleteListItem(itemId)
      .then((res) => {
        console.log(res);
        setContent(content.filter((item) => item._id !== itemId));
      })
      .catch((err) => console.log(err));
  };

  const handleStatus = (itemId, complete) => {
    console.log('inside status',itemId, complete)
    userService
      .toggleListItem(itemId, complete)
      .then((res) => {
        console.log(res);
        if(res.data.status) {
          const elementsIndex = content.findIndex(element => element._id === itemId )
          let resArr = [...content];
          resArr[elementsIndex] = {...resArr[elementsIndex], completed: !resArr[elementsIndex].completed}
          setContent(resArr);
        }
      })
      .catch((err) => console.log(err));
  }

  const RenderList = (listContent) => {
    let mapArr = [...listContent];
    if(isComplete) {
      mapArr = mapArr.filter(item => item.completed === true)
    }
    else {
      mapArr = mapArr.filter(item => item.completed === false)
    }
    return mapArr.map((item) => {
      return (
        <div key={item._id} className="listItem__container">
          <div className="listButton__container">
            <button
              onClick={() => handleStatus(item._id, item.completed)}
              className="deleteButton"
              title={item.completed ? "Move to In-progress": 'Move to Completed'}
            >
              {item.completed ? <HourglassEmptyOutlinedIcon style={{ fontSize: 15 }}/> : <CheckCircleOutlineIcon style={{ fontSize: 20 }} />} 
            </button>
            <button
              onClick={() => handleDelete(item._id)}
              className="deleteButton"
              title="Delete this entry"
            >
              <DeleteOutlinedIcon style={{ fontSize: 20 }} />
            </button>
          </div>
          <div className="item__detail">
            {item.completed ? <span className="listItem__title"><del>{item.itemTitle}</del></span> : <span className="listItem__title">{item.itemTitle}</span>}
            <span className="listItem__description">
              {item.itemDescription}
            </span>
          </div>
        </div>
      );
    });
  };

  const handleSubmit = () => {
    if (title === "") {
      alert("title can not be empty");
      return;
    }
    if (description === "") {
      alert("description can not be empty");
      return;
    }
    setTitle("");
    setDescription("");
    userService
      .postListItem(title, description)
      .then((res) => {
        setContent([...content, res.data]);
        setIsModalVisible(false)
      })
      .catch((err) => {
        console.log(err)
        setIsModalVisible(false)
      });
  };

  const toggleStatus = () => {
    setIsComplete(!isComplete);
  };

  if (loader) return null;
  return (
    <div className="listComponent__container">
      <div className="listComp__container">
        <div className="list__container">{RenderList(content)}</div>
      </div>
      <div className="addButton">
        <button
          className="add__button button1"
          onClick={() => setIsModalVisible(true)}
        >
          <AddIcon />
        </button>
        <button className="add__button button1 button2" onClick={toggleStatus}>
          {isComplete ? "Show InProgress" : "Show Completed"}
        </button>
      </div>
      <Modal
        visible={isModalVisible}
        bodyStyle={modalStyle}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
      >
        <div className="input__container">
          <div>
            <input
              type="text"
              className="input__title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Enter Title"
            />
          </div>
          <div>
            <textarea
              rows="3"
              type="text"
              className="input__description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Enter Description"
            />
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button className="add__button" onClick={handleSubmit}>
              <AddIcon />
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const modalStyle = {
  backgroundColor: "#1B2021",
};

export default List;
