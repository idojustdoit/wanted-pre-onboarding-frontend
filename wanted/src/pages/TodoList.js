import React, { useRef, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthAxiosInstance1, AuthAxiosInstance2 } from "../utils/AxiosInstance";
import { TodoDispatchcontext } from "../App.js";

import Todo from "../components/Todo";
import isLogin from "../utils/isLogin";

function TodoList({ data }) {
  const location = useLocation().pathname;
  const navigate = useNavigate();

  const { onCreate, onInit } = useContext(TodoDispatchcontext);
  const Todo_ref = useRef();

  //로그인 여부로 페이지 경로 나누기
  useEffect(() => {
    if (!isLogin() && location === "/todos") {
      navigate("/");
    }
    GetTodoApi();
  }, []);
  console.log(data);
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

  //todo 항목 생성
  const createTodo = () => {
    const todo = Todo_ref.current.value;
    AuthAxiosInstance1.post("/todos", { todo: Todo_ref.current.value })
      .then(function (res) {
        onCreate(todo, res.data.id, res.data.isCompleted);
        Todo_ref.current.value = "";
      })
      .catch(function (error) {
        alert(error.response.data.message);
        console.log(error);
      });
  };

  //로그아웃
  const logout = () => {
    localStorage.removeItem("access_token");
    navigate("/");
  };

  // Enter 입력이 되면 클릭 이벤트 실행
  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      createTodo();
    }
  };

  return (
    <div>
      투두리스트 만드는곳
      <input
        type="text"
        placeholder="해야할 일을 적어주세요"
        ref={Todo_ref}
        onKeyPress={handleOnKeyPress}
      />
      <button onClick={createTodo}>Make Todo</button>
      <button onClick={logout}>로그아웃</button>
      <div>
        <span>todolist</span>
        <div>
          {data.map((item) => (
            <Todo
              key={item.id}
              id={item.id}
              todo={item.todo}
              isCompleted={item.isCompleted}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TodoList;
