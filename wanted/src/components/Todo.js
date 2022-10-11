import React, { useState, useContext } from "react";
import { AuthAxiosInstance1, AuthAxiosInstance2 } from "../utils/AxiosInstance";
import { TodoDispatchcontext } from "../App.js";

function Todo(props) {
  const [isEdited, setIsEdited] = useState(false);
  const toggleIsCompleted = () => setIsEdited(!isEdited);
  const [retext, setRetext] = useState(props.todo);
  const targetId = props.id;
  const { onEdit, onRemove, onInit } = useContext(TodoDispatchcontext);

  const deleteTodoApi = () => {
    AuthAxiosInstance2.delete(`/todos/${targetId}`)
      .then((res) => {
        console.log(res);
        onRemove(targetId);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateTodoApi = () => {
    const data = {
      todo: retext,
      isCompleted: true,
    };

    AuthAxiosInstance1.put(`/todos/${targetId}`, data)
      .then((res) => {
        console.log(res);
        onEdit(targetId, res.data.todo, res.data.isCompleted);
        setIsEdited(false);
        GetTodoApi();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      updateTodoApi();
    }
  };
  //todo list 불러오기
  const GetTodoApi = () => {
    AuthAxiosInstance2.get("/todos")
      .then(function (res) {
        console.log(res.data);
        onInit(res.data);
      })
      .catch(function (error) {
        alert(error.response.data.message);
        console.log(error);
      });
  };
  const EditHandler = (e) => {
    e.preventDefault();
    setRetext(e.target.value);
  };
  console.log(props.todo);
  const quitEdit = () => {
    setIsEdited(false);
    setRetext(props.todo);
  };
  return (
    <div>
      {isEdited ? (
        <>
          <input
            value={retext}
            onChange={EditHandler}
            onKeyPress={handleOnKeyPress}
          />
          <button onClick={quitEdit}>수정 취소</button>
          <button onClick={updateTodoApi}>수정 완료</button>
        </>
      ) : (
        <>
          <span>{props.todo}</span>
          <button onClick={deleteTodoApi}>삭제</button>
          <button onClick={toggleIsCompleted}>수정</button>
        </>
      )}
    </div>
  );
}

export default Todo;
