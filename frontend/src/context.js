import React, { useState, useReducer, useContext } from "react";
import { globalReducer } from "./Reducer/globalReducer";
import { getUser } from "./network/auth";

const AppContext = React.createContext();

const initialState = {
  loading: false,
  alert: { message: "", show: false, msgtype: "danger" },
  isLogined: false,
  token:'',
  user:{}
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);
//   console.log(state.user);

  const toggleLoading = () => {
    dispatch({ type: "TOGGLE_LOADING" });
  };

  const toggleAlert = (message,msgtype) => {
    setTimeout(() => {
        dispatch({ type: "TOGGLE_ALERT", message:'' ,msgtype:''});
     },3000)
    dispatch({ type: "TOGGLE_ALERT", message:message ,msgtype:msgtype});
  };

  const setUser = (token) => {
    getUser(token).then(user => {
        dispatch({type:"SET_USER_VALUES",data:{token,userdata:user.data}})
    })
  };

  const logoutUser = () => {
    dispatch({type:"USER_LOGOUT"});
  }

  return (
    <AppContext.Provider
      value={{ ...state, toggleLoading, toggleAlert, setUser,logoutUser }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
