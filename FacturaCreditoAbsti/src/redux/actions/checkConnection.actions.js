import axios from 'axios';
import { CHECK_CONNECTION } from '../constants/checkConnection.constants';
import { isLoading } from './app.actions';
/* import { IS_LOADING } from '../constants/app.constants'; */



// CHECK CONNECTION

export function checkConnection(dispatch) {
     // MOCK ACTION
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            let con = Math.round(Math.random() * (10 - 1) + 1)
            if (con % 2 === 0) {
                dispatch({
                    type: CHECK_CONNECTION,
                    payload: true
                })
            } else {
                dispatch({
                    type: CHECK_CONNECTION,
                    payload: false
                })
            }
            
            
            dispatch(isLoading(false))
            resolve()
        },2000)
    })

     // REAL ACTION 
    /*    return new Promise((resolve,reject)=> {
        axios.get('./CheckStatus.asp')
        .then(response => { 
            if (response.data.appServer === "OK" && response.data.authServer === "OK" && response.data.dbServer === "OK") {
                dispatch({
                    type: CHECK_CONNECTION,
                    payload: true
                })
            } else {
                dispatch({
                    type: CHECK_CONNECTION,
                    payload: false
                })
            }
            isLoading(false)
           resolve()
        })
        .catch(err => console.log(err),isLoading(false),reject())
       })
     */


}