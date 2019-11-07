import { invoiceResponse, GetAllInvoices } from "../constants/axiosResponse";

export default class InvoiceService {


    pendingVoices = invoiceResponse.data.data.arrayComprobantes;

    allInvoices = GetAllInvoices;

    constructor(){
        
    }

    getInvoices(rowsPerPage = 2, page = 1, searchValues) {

        let data = [];
        let searchInputs = Object.keys(searchValues);
        this.pendingVoices.forEach(invoice => {
           let match = 0;
           searchInputs.forEach(e => {
               if (e == "estado") {
                   return invoice.estado.estado.toString().includes(searchValues[e].trim()) ? match++ : "";
               } else {
                   return invoice[e].toString().toLowerCase().includes(searchValues[e].trim().toLowerCase()) ? match++ : "";
               }
           })
           if (match == searchInputs.length && this.isBetweenSelectedDates(invoice[searchValues["tipoFecha"]])) {
               data.push(invoice);
           }
        });

        return this.paginator(data,page,rowsPerPage) ;
    }

    isBetweenSelectedDates(fecha, desde, hasta) {

        let fechaAux = new Date(fecha);

        if (hasta == null && desde == null) {
            return true
        } else if (hasta == null) {
            return fechaAux >= desde
        } else if (desde == null) {
            return fechaAux <= hasta
        }
        else {
            return fechaAux >= desde && fechaAux <= hasta
        }

    }
     getNumberOfPages(list, numberPerPage) {
        return Math.ceil(list.length / numberPerPage);
    }
    
  paginator(items, page, per_page) {
 
    var page = page || 1,
    per_page = per_page || 10,
    offset = (page - 1) * per_page,
   
    paginatedItems = items.slice(offset).slice(0, per_page),
    total_pages = Math.ceil(items.length / per_page);
    return {

    page: page,
    per_page: per_page,
    pre_page: page - 1 ? page - 1 : null,
    next_page: (total_pages > page) ? page + 1 : null,
    total: items.length,
    total_pages: total_pages,
    data: paginatedItems
    
};
  }
  
}