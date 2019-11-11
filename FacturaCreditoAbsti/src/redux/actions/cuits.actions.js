import { SET_CUIT } from "../constants/cuits.constants";


// SET SELECTED CUIT 
export function setCuit(cuit) {
          
    return  {
                type: SET_CUIT,
                payload: cuit
           }
}
