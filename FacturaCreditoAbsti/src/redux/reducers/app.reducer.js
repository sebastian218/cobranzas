import { IS_LOADING, SET_ERROR } from "../constants/app.constants"

const initialState = {

      isLoading : true,
      errorMsg: '',
      errorStatus: null

}


const appReducer = (state = initialState, action) => {
    switch (action.type) {
         case IS_LOADING:
              return {...state,  isLoading: action.payload }
          case SET_ERROR :
               return {...state, errorMsg: action.payload.errorMsg, errorStatus: action.payload.errorMsg}    
         default:
              return state 
    }

}

export default appReducer