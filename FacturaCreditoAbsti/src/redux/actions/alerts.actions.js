import { GET_ERROR, CREATE_MESSAGE } from "../constants/alerts.constants";


// CREATE MESSAGE 

export const createMessage = (msg,type) => {
        
        return {
            type : CREATE_MESSAGE,
            payload : {
                 msg: msg,
                 type: type
            }
        }
}

// GET ERROR

export const returnErrors = (msg,status) => {
    return {
        type : GET_ERROR,
        payload : {msg,status}
    }
}