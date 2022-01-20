import axios from "axios";
import { GET_PROFILE, PROFILE_LOADING, GET_EERORS,CLEAR_CURRENT_PROFILE } from "./types";

//get current profile
export const getCurrentProfile = () => async (dispatch) => {
  dispatch(setProfileLoading);
  try {

    const res = await axios.get("/api/profile",{
        headers: { 'Authorization': localStorage.jwtToken}
    });



    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_PROFILE,
      payload: {},
    });
  }
};

export const setProfileLoading = (dispatch) => {
  dispatch({
    type: PROFILE_LOADING,
  });
};

//clear profile

export const clearCurrentProfile = () =>  {

    return {
        type :CLEAR_CURRENT_PROFILE
    }
}

