import {combineReducers} from 'redux';
import invoiceReducer from './invoice.reducer'
import checkConnectionReducer from './checkConnection.reducer';
import appReducer from './app.reducer';
import errorsReducer from './errors.reducer';
import messagesReducer from './messages.reducer';
import tableParamsReducer from './tableParams.reducer';
import cuitsReducer from './cuits.reducers';



export default combineReducers({
             
            invoiceReducer,
             checkConnectionReducer,
             appReducer,
             errorsReducer,
             messagesReducer,
             tableParamsReducer,
             cuitsReducer
             
});

