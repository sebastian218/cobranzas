import { SET_INVOICE } from "./types"
import { SET_ALLINVOICES, SET_ALLPENDINGINVOICES, FILTERED_ALLINVOICES, FILTERED_PENDINGINVOICES } from "../constants/invoices.constants";
import { invoiceResponse, GetAllInvoices, allPendingClon } from '../../constants/axiosResponse';

import axios from 'axios';


// SET SELECTED INVOICE
export function setInvoice(invoice) {
    return { type: SET_INVOICE, payload: invoice };
}


// SET ALL INVOICES (CUENTAS CORRIENTES) 
export function setAllInvoices(allInvoices) {
    return { type: SET_ALLINVOICES, payload: allInvoices }
}


// SET ALL PENDING INVOICES (PENDIENTES)
export function setAllPendingInvoices(allPendingInvoices) {
    return { type: SET_ALLPENDINGINVOICES, payload: allPendingInvoices }
}

// SET FILTERED INVOICES

export function setFilteredInvoices(allPendingInvoices) {
    return { type: FILTERED_ALLINVOICES, payload: allPendingInvoices }
}


// SET FILTERED PENDING INVOICES

export function setFilteredPendingInvoices(allPendingInvoices) {
    return { type: FILTERED_PENDINGINVOICES, payload: allPendingInvoices }
}

// A PARTIR DE ACÁ NO SON METODOS PARA REDUX 

//GET ALL INVOICES
export function getAllInvoices(cuit) {

    //MOCK DATOS

    return new Promise((resolve, reject) => {
        GetAllInvoices.data.data.arrayComprobantes.forEach((e, index) => {
            isSupplierValid(e)
                .then(isSuppplier =>{
                     e.isSupplierValid = isSuppplier
                });
            if (e.estado.estado != "Pendiente Recepción" && e.estado.estado != "Pendiente" && e.estado.estado != "Recepcionado") {
                /* console.log(e.estado.estado) */
                e.StatusHistory = [
                    {
                        "Usuario": "Pedro " + index,
                        "Fecha cambio": "2019-09-17T00:00:00",
                        "Nuevo Estado": "Recepcionado"
                    },
                    {
                        "Usuario": "Maria " + index,
                        "Fecha cambio": "2019-09-17T00:00:00",
                        "Nuevo Estado": "Aceptado"
                    },
                    {
                        "Usuario": "Jose " + index,
                        "Fecha cambio": "2019-09-17T00:00:00",
                        "Nuevo Estado": "Rechazado"
                    },
                ]
            } else {
                e.StatusHistory = [];
            }
        })
        resolve(GetAllInvoices)
    })

    /*  return new Promise((resolve, reject) => {
         axios.get(`api/AFIP/GetAllInvoices/${cuit}`)
             .then(res => {
                 res.data.data.arrayComprobantes.forEach(invoice => {
                     checkStatusHistory(invoice)
                         .then(res => {
                             invoice.StatusChange = res;
                         })
                 });
                 resolve(res.data.data.arrayComprobantes);
             })
             .catch(err => {
                 console.log(err);
                 reject(err);
             })
 
     }) */
}

//CHECK STATUS HISTORY
function checkStatusHistory(invoice) {
    return new Promise((resolve, reject) => {
        axios.get('./GetInvoiceStatusHistory.asp', {

            params: {
                invoice: '' + invoice.cuit + invoice.codTipoCmp + invoice.ptoVta + invoice.nroCmp
            }
        })
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            })
    })
}
// CHECK IS SUPPLIER VALID 
function isSupplierValid(cuitEmisor) {
    let con = Math.round(Math.random() * (10 - 1) + 1)
    return new Promise((resolve,reject)=>{
        resolve(con % 2 == 0 ? true : false)
    })
      
     
    /*     return new Promise((resolve, reject) => {
            axios.get('./IsSupplierValid.asp', { params: { supplier: cuitEmisor } });//gets supplier’s CUIT as param
            onResponse.then(res => {
                resolve(res)
            });
        }) */

}

//GET ALL PENDING INVOICES
export function getAllPendingInvoices(cuit) {


    //MOCK DATOS

    return new Promise((resolve, reject) => {
        allPendingClon.data.data.arrayComprobantes.forEach((e, index) => {
            if (e.estado.estado != "Pendiente Recepción" && e.estado.estado != "Pendiente" && e.estado.estado != "Recepcionado") {
                e.StatusHistory = [
                    {
                        "Usuario": "Pedro " + index,
                        "Fecha cambio": "2019-09-17T00:00:00",
                        "Nuevo Estado": "Recepcionado"
                    },
                    {
                        "Usuario": "Maria " + index,
                        "Fecha cambio": "2019-09-17T00:00:00",
                        "Nuevo Estado": "Aceptado"
                    },
                    {
                        "Usuario": "Jose " + index,
                        "Fecha cambio": "2019-09-17T00:00:00",
                        "Nuevo Estado": "Rechazado"
                    },
                ]
            } else {
                e.StatusHistory = [];
            }
            isSupplierValid(e)
            .then(isSuppplier =>{
                 e.isSupplierValid = isSuppplier
            })
        })
        resolve(allPendingClon)
    })


    /*     return new Promise((resolve,reject)=>{
          axios.get(`api/AFIP/GetAllPendingInvoices/${cuit}`)
               .then(res => {
                   res.data.data.arrayComprobantes.forEach(invoice => {
                    checkStatusHistory(invoice)
                        .then(res => {
                            invoice.StatusChange = res;
                        })
                });
                     resolve(res.data.data.arrayComprobantes);
               }) 
               .catch(err =>{
                   reject(err)
                     console.log(err);
               })     
                
      }) */
}

// OBTENER TOIDAS LAS FACTURAS EN UN SOLO LLAMADO
export function getInvoices(cuit) {

    return new Promise((resolve, reject) => {
        getAllPendingInvoices(cuit)
            .then(res => {
                let allPending = res;
                getAllPendingInvoices(cuit)
                    .then(res => {
                        let allInvoices = res;
                        resolve([allPending, allInvoices])
                    })
                    .catch(err => {
                        reject(err);
                    })
            })
            .catch(err => {
                reject(err);
            })
    })

}