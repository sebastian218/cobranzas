import { IS_LOADING } from "../constants/app.constants";




// IS LOADING

export function isLoading(value) {
          
      return  {
                  type: IS_LOADING,
                  payload: value
             }
}