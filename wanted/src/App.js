import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useReducer, createContext, useRef } from "react";
import "./App.css";

import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import TodoList from "./pages/TodoList";

const TodolistReducer = (state, action) => {
  console.log(state);
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      newState = [action.data, ...state];

      break;
    }
    case "REMOVE": {
      newState = state.filter((it, index) => it.id !== action.targetId);
      break;
    }

    case "EDIT": {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }

    default:
      return state;
  }

  return newState;
};

export const TodoStateContext = createContext();
export const TodoDispatchcontext = createContext();

function App() {
  const [datas, dispatch] = useReducer(TodolistReducer, []);
  const dataId = useRef(0);

  //INIT
  const onInit = (data) => {
    dispatch({ type: "INIT", data: data });
  };
  //SAVE
  const onCreate = (todo, id, isCompleted) => {
    dispatch({
      type: "CREATE",
      data: {
        todo,
        id,
        isCompleted,
      },
    });
    dataId.current += 1;
  };

  //REMOVE
  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };
  //EDIT
  const onEdit = (targetId, todo, isCompleted) => {
    dispatch({ type: "EDIT", data: { targetId, todo, isCompleted } });
  };

  return (
    <div className="App">
      <TodoStateContext.Provider value={datas}>
        <TodoDispatchcontext.Provider
          value={{ onInit, onCreate, onRemove, onEdit }}
        >
          <BrowserRouter>
            <Routes>
              <Route path="todos" element={<TodoList data={datas} />} />
              <Route path="/" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TodoDispatchcontext.Provider>
      </TodoStateContext.Provider>
    </div>
  );
}

export default App;
