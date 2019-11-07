import React , {Fragment} from "react";
import { connect } from "react-redux";
import {withAlert} from 'react-alert';
import { SUCCESS, ALERT, ERROR } from "../../constants/alertsTypes";



class Alerts extends React.Component {
      


   componentDidMount(){ 
      

   }

   componentDidUpdate(prevProps){
          const {errorsReducer,messagesReducer, alert} = this.props;
            
         if(messagesReducer !== prevProps.messagesReducer){
                     
                     if(messagesReducer.type == SUCCESS){
                        alert.success(messagesReducer.msg)
                     }
                     if(messagesReducer.type == ERROR){
                        alert.error(messagesReducer.msg)
                     }
                     if(messagesReducer.type == ALERT){
                        alert.show(messagesReducer.msg)
                     }
        }


   }


    render(){
        return(
             <Fragment/>
        );
    }
}

function mapStateToProps(state) {
    const { errorsReducer, messagesReducer} = state;
    return {
        errorsReducer,
        messagesReducer
    };
}


export default connect(mapStateToProps)(withAlert()(Alerts))



