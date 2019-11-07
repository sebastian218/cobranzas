import { SET_INVOICE } from "../actions/types";
import { SET_ALLPENDINGINVOICES, SET_ALLINVOICES, FILTERED_ALLINVOICES, FILTERED_PENDINGINVOICES } from "../constants/invoices.constants";




const initialState = {
     allPendingInvoices: [],
     allInvoices: [],
     allPendingInvoicesAux: [],
     allInvoicesAux:[],
     selectedInvoice: {},
     selectedDetalle: {}
}

const invoiceReducer = (state = initialState, action) => {

     switch (action.type) {
          case SET_INVOICE: {
               return {
                    ...state,
                    selectedInvoice: action.payload.item,
                    selectedDetalle: action.payload.detalle
               }
          }
          case SET_ALLPENDINGINVOICES: {
               return {
                    ...state,
                    allPendingInvoices: action.payload,
                    allPendingInvoicesAux : action.payload
               }
          }
          case SET_ALLINVOICES: {
               return {
                    ...state,
                    allInvoices: action.payload,
                    allInvoicesAux : action.payload
               }
          }
          case FILTERED_PENDINGINVOICES: {
               return {
                    ...state,
                    allPendingInvoices: action.payload
               }
          }
          case FILTERED_ALLINVOICES : {
               return {
                    ...state,
                    allInvoices: action.payload,
               }
          }
          default: {
               return state;
          }
     }
}

export default invoiceReducer;