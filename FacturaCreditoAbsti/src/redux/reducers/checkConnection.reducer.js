import { CHECK_CONNECTION } from "../constants/checkConnection.constants"


const initialState = {       
       connectionSucces : false
}


const  checkConnectionReducer  = (state = initialState, action) => {
    switch (action.type) {
         case CHECK_CONNECTION:
              return {...state, connectionSucces: action.payload }
         default:
              return state 
    }

}


export default checkConnectionReducer