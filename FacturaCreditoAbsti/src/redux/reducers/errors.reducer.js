import { GET_ERROR } from "../constants/alerts.constants"


const initialState = {
    msg: {},
    status: null
}


const errorsReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_ERROR:
            return {
                msg: action.payload.msg,
                status: action.payload.status
            }
        default:
            return state
    }

}



export default errorsReducer