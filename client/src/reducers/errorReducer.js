import {GET_EERORS} from "../actions/types";

const initialState = {};

const errorReducer = (state = initialState ,action) =>{

    switch(action.type){

        case GET_EERORS :
            return action.payload;
        default:
            return state;

    }

}

export default errorReducer;

