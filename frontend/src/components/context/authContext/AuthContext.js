import axios from "axios";
import { createContext, useReducer } from "react";
import {
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  FETCH_PROFILE_FAIL,
  FETCH_PROFILE_SUCCESS,
  LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "./authActionType";
import { API_URL_USER } from "../../../utils/apiURLs";

// auth context
export const authContext = createContext();

// initial states
const INITIAL_STATE = {
  userAuth: JSON.parse(localStorage.getItem("userAuth")),
  error: null,
  loading: false,
  profile: null,
};

// auth reducer
const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    // register reducer handle
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        userAuth: payload,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        userAuth: null,
      };

    // login reducer handle
    case LOGIN_SUCCESS:
      // add to local storage
      localStorage.setItem("userAuth", JSON.stringify(payload));

      return {
        ...state,
        loading: false,
        error: null,
        userAuth: payload,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
        userAuth: null,
      };

    // profile reducer handle
    case FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        profile: payload,
      };

    case FETCH_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        profile: null,
      };

    // logout
    case LOGOUT:
      //remove user from storage
      localStorage.removeItem("userAuth");

      return {
        ...state,
        loading: false,
        error: null,
        userAuth: null,
      };

    default:
      return state;
  }
};

// provider -- high order component
const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  //register action
  const userRegister = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        `${API_URL_USER}/register`,
        formData,
        config
      );
      if (res?.data?.status === "success") {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data,
        });
      }
      //REDIRECT
      window.location.href = "/login";
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

  //login action
  const userLogin = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(`${API_URL_USER}/login`, formData, config);
      if (res?.data?.status === "success") {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
      }
      //REDIRECT
      window.location.href = "/dashboard";
    } catch (error) {
      dispatch({
        type: LOGIN_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  };

  //profile action
  const userProfile = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state?.userAuth?.token}`,
        },
      };
      const res = await axios.get(`${API_URL_USER}/profile`, config);

      if (res?.data) {
        dispatch({
          type: FETCH_PROFILE_SUCCESS,
          payload: res.data,
        });
      }
    } catch (error) {
      dispatch({
        type: FETCH_PROFILE_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

  //logout action
  const userLogout = () => {
    dispatch({
      type: LOGOUT,
      payload: null,
    });
    //REDIRECT
    window.location.href = "/login";
  };

  return (
    <authContext.Provider
      value={{
        userLogin,
        userAuth: state,
        token: state?.userAuth?.token,
        userProfile,
        profile: state?.profile,
        error: state?.error,
        userLogout,
        userRegister,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
