import { SET_TABLEPARAMS } from "../constants/tableParams.constants"



const initialState = {       
    page : 1,
    per_page: 5,
    filters: null
}

const tableParamsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TABLEPARAMS :
            return {...state, page:action.payload.page ,per_page:action.payload.per_page ,filters:action.payload.filters } 
         default:
              return state 
    }

}

export default tableParamsReducer