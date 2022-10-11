import React, { useReducer, createContext } from "react";

function TodolistContext(state, action) {
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

    default:
      return state;
  }

  return newState;
}

export default TodolistContext;

export const TodoStateContext = createContext();
export const TodoDispatchcontext = createContext();
