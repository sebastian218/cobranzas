import { CREATE_MESSAGE } from "../constants/alerts.constants"


const initialState = {
    type: "",
    msg: ""
}


const messagesReducer = (state = initialState, action) => {

    switch (action.type) {
        case CREATE_MESSAGE:
            return { msg: action.payload.msg , type: action.payload.type }
        default:
            return state
    }

}



export default messagesReducer