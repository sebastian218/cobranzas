import {SET_CUIT} from "../constants/cuits.constants";

const initialState = {
      selectedCuit: ''
}


const  cuitsReducer  = (state = initialState, action) => {
    switch (action.type) {
         case SET_CUIT:
              return {...state, selectedCuit: action.payload }
         default:
              return state 
    }

}


export default cuitsReducer