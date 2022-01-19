import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { GET_EERORS,SET_CURRENT_USER } from "./types";
import jwt_decode from "jwt-decode";


//register

export const registerUser = (userData, navigate) => async (dispatch) => {
  try {
    const res = await axios.post("/api/users/register", userData);

    navigate("/login");
  } catch (err) {
    const errors = err.response.data;

    dispatch({
      type: GET_EERORS,
      payload: errors,
    });
  }
};

//login - get user token
export const loginUser = (userData) => async (dispatch) => {

    try{

        const res  =  await axios.post('api/users/login',userData);

        //save to localStorage
        const {token} = res.data;
        //set token to localStorage
        localStorage.setItem("jwtToken", token);

        //set token to auth header
        setAuthToken(token);

        //decode token to get user data
        const decoded = await jwt_decode(token);
        //set current user 
        dispatch(setCurrentUser(decoded))

    }catch(err) {

        dispatch({
            type : GET_EERORS,
            payload : err.response.data

        })

    }

   

};

export const setCurrentUser = (decoded) =>{

    return{
        type : SET_CURRENT_USER,
        payload : decoded
    }

}

export const logoutUser = (navigate) => (dispatch) =>{

    localStorage.removeItem('jwtToken');

    setAuthToken(false);

    //set current user to empty
    dispatch(setCurrentUser({}));

    navigate('/login');

}
