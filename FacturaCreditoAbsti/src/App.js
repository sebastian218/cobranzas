import React, {Fragment} from 'react';
import axios from 'axios'
import Offline from './components/Offline';
import Cuits from './components/CUITS';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import store from './store';
import  Alerts  from './components/shared/Alerts';



const alertOptions = {
    timeout: 3000,
    position: 'top right'
}
class Connected extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <Provider store={store}>
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                    <Fragment>
                    <Alerts />                
                    <Cuits />
                    </Fragment>
                </AlertProvider>
            </Provider>
        );

    }
}



export default Connected