//@ts-check
import React, { Fragment } from 'react';
import Moment from 'moment';
import axios from 'axios'
import Filters from './Filters'
import Actions from './Actions';
import RejectForm from './RejectForm';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setInvoice, setFilteredPendingInvoices } from '../redux/actions/invoice';
import StatusHistory from './StatusHistory';
import AceptacionForm from './Aceptacion/AceptacionForm';
import LoadingScreen from './shared/LoadingScreen';
import { getOnlyAsociatedDocuments } from '../constants/axiosResponse';
import Pagination from 'react-bootstrap/Pagination';
import PageItem from 'react-bootstrap/PageItem';
import { tiposFCE } from '../constants/tiposFCE';
import TablePagination from './shared/TablePagination';
import ReactPaginate from 'react-paginate';
import InvoiceService from '../helpers/Invoices.service.helper';





class Facturas extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            detalleLoading: false,
            toggleDetalle: false,
            selectedInvoiceCuit: '',
            rzonScial: '',
            openRejectForm: false,
            openStatusHistory: false,
            openAcceptForm: false,
            rejectType: "",
            historyData: "",
            selectedInvoice: {},
            documentosAsociados: [],

        }




        this.handleOpenRejectForm = this.handleOpenRejectForm.bind(this);
        this.closeRejectForm = this.closeRejectForm.bind(this);
        this.openStatusHistory = this.openStatusHistory.bind(this);
        this.closeStatusHistory = this.closeStatusHistory.bind(this);
        this.openAcceptForm = this.openAcceptForm.bind(this);
        this.closeAcceptForm = this.closeAcceptForm.bind(this);
        this.exportToXLS = this.exportToXLS.bind(this);
        this.paginationChange = this.paginationChange.bind(this);
        this.handleComprobantesAsoc = this.handleComprobantesAsoc.bind(this);
       
    }



    handleOpenRejectForm(item, actionType) {
        this.createDetalle(item);
        this.setState({ openRejectForm: true, rejectType: actionType })
    }
    createDetalle(item) {
        let detalle = {
            razonSocialEmi: {
                col: "Razon Social",
                data: item.razonSocialEmi
            },
            importeTotal: {
                col: "Importe Toal",
                data: item.importeTotal
            },
            codMoneda: {
                col: "Moneda",
                data: item.codMoneda
            },
            referenciasComerciales: {
                col: "Concepto",
                data: item.referenciasComerciales
            },
        };

        let data = {
            item,
            detalle
        }

        this.props.setSelectedInvoice(data)
    }
    exportToXLS() {
        this.setState({ loading: true })
        setTimeout(() => {
            this.setState({ loading: false })
            window.open("https://www.cmu.edu/blackboard/files/evaluate/tests-example.xls", "_blank")
        }, 1000)

        // SOLUTION
        /*         this.getXLS()
                .then(res =>{
                    this.setState({loading: false})
                    window.open(res.url, "_blank")
        
                }) */

    }
    openAcceptForm(item) {
        this.createDetalle(item);
        this.setState({ openAcceptForm: true })
    }
    openStatusHistory(data) {
        this.setState({ historyData: data })
        this.setState({ openStatusHistory: true });
    }
    closeStatusHistory() {
        this.setState({ openStatusHistory: false });
    }

    closeRejectForm() {
        this.setState({ openRejectForm: false })
    }
    closeAcceptForm(close) {

        this.setState({ openAcceptForm: false })


    }

    getXLS() {
        return new Promise((resolve, reject) => {
            let data = this.props.facturas;
            axios.get("api/excel.asp", data)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
    async handleComprobantesAsoc(invoice) {

        const { selectedInvoiceCuit } = this.state;

        /* await this.setState((state) => ({ ...state,  selectedInvoiceCuit: invoice.cuitEmisor })); */

        this.createDetalle(invoice);

        if (selectedInvoiceCuit !== invoice.cuitEmisor) {
            this.setState((state) => ({ ...state, selectedInvoiceCuit: invoice.cuitEmisor, detalleLoading: true }));
            this.getAsociatedDocs()
                .then(res => {
                    this.setState({ documentosAsociados: res, detalleLoading: false });

                    console.log(this.state);

                })
        } else {
            this.setState((state) => ({ ...state, selectedInvoiceCuit: "" }));
        }


    }
    getAsociatedDocs() {
        // MOCK
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(getOnlyAsociatedDocuments.data.arrayComprobantes)
            }, 2000)
        })
    }
    paginationChange(page){
        console.log("FACTURAS RECIBE PAGE", page )
        let serviceData = new InvoiceService().getInvoices(2, page, null)
        console.log(serviceData)
        this.props.setFilteredPendingInvoices(serviceData.data);
    }
    cancelInvoice() {

    }
  

    render() {
        const { openRejectForm, rejectType, openStatusHistory, historyData, openAcceptForm, loading, documentosAsociados, selectedInvoiceCuit, detalleLoading } = this.state;
        return (
            <div >
                {loading ? <LoadingScreen /> : ''}
                <div>
                    {this.props.showActions ? <div><AceptacionForm cuit={this.props.cuit} open={openAcceptForm} handleClose={(close) => this.closeAcceptForm(close)} /> <RejectForm cuit={this.props.cuit} handleClose={this.closeRejectForm} actionType={rejectType} open={openRejectForm} /> </div> : ""}
                    {historyData != "" ? <StatusHistory open={openStatusHistory} data={historyData} handleClose={this.closeStatusHistory} onClose={this.closeStatusHistory} /> : ""}
                </div>
                <div className="p-1">
                <h3 className="p-2 mt-3 d-flex align-items-center">Comprobantes para {this.props.rznSocial + " (" + this.props.cuit + ")"} <button onClick={() => this.exportToXLS()} className="btn  btn-sm" type="button"><img width="35" src="./excel.svg" /></button></h3>
                <Filters />
                <div className="x-auto">
                <table className="table mt-3 table-sm tabla-facturas">
                    <thead className="bg-lightGrey">
                        <tr >
                            <th className="bt-none"></th>
                            <th className="bt-none">CUIT Emisor</th>
                            <th className="bt-none">Razón Social</th>
                            <th className="bt-none">Tipo Doc.</th>
                            <th className="bt-none">Pto Vta</th>
                            <th className="bt-none">Nro</th>
                            <th className="bt-none">Importe</th>
                            <th className="bt-none">Moneda</th>
                            <th className="bt-none">Cot</th>
                            <th className="bt-none">Estado</th>
                            <th className="bt-none">Fecha Em</th>
                            <th className="bt-none">Fecha Disp</th>
                            <th className="bt-none">Fecha Vto</th>
                            <th className="bt-none">Fecha Vto Acept</th>
                            <th className="bt-none">CAE</th>
                            <th className="bt-none"></th>
                            <th className="bt-none"></th>
                        </tr>
                    </thead>
                    <tbody id="wrapper">{this.props.facturas.map((item, key) => (
                        <Fragment>
                            <tr key={'' + key} style={{ backgroundColor: item.isSupplierValid ? "rgba(240,128,128,0.3)" : "" }}>
                                <td> {item.cuitEmisor == selectedInvoiceCuit && detalleLoading ? <img width="30px" src="./Spinner.svg" /> : <img  className={" "+(item.cuitEmisor == selectedInvoiceCuit ? "rotateimg180" : "")} onClick={() => this.handleComprobantesAsoc(item)} style={{ cursor: "pointer" }} width="20px" src="./up-chevron.svg" />}  </td>
                                <td>{item.cuitEmisor}</td>
                                <td>{item.razonSocialEmi}</td>
                                <td>{item.codTipoCmp}</td>
                                <td>{item.ptovta}</td>
                                <td>{item.nroCmp}</td>
                                <td>{item.importeTotal}</td>
                                <td>{item.importecodMoneda}</td>
                                <td>{item.cotizacionMoneda}</td>
                                <td> {item.StatusHistory.length > 0 ? <a href="#" onClick={() => this.openStatusHistory(item.StatusHistory)}>{item.estado.estado}</a> : item.estado.estado}</td>
                                <td>{Moment(item.fechaEmision).format('DD/MM/YYYY')}</td>
                                <td>{Moment(item.fechaPuestaDispo).format('DD/MM/YYYY')}</td>
                                <td>{Moment(item.fechaVenPago).format('DD/MM/YYYY')}</td>
                                <td>{Moment(item.fechaVenAcep).format('DD/MM/YYYY')}</td>
                                <td>{item.codAutorizacion}</td>
                                <td colSpan={2}>
                                    {item.estado.estado == 'Recepcionado' ? <Actions openReject={() => this.handleOpenRejectForm(item, 'R')} openCancel={() => this.handleOpenRejectForm(item, 'C')} openAccept={() => this.openAcceptForm(item)} /> : ""}
                                </td>
                            </tr >
                            {item.cuitEmisor == selectedInvoiceCuit && !detalleLoading ?

                                <tr id={item.cuitEmisor} ref={this.state.content} className=" p-0 " >
                                    <td colSpan={17} className="p-0">
                                        <div className="x-auto ">
                                             <small className="text-secondary">Comprobantes Asociados a la factura de crédito</small>
                                            <table className="table table-sm tabla-facturas ">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Tipo Doc</th>
                                                        <th scope="col">Pto.Vta.</th>
                                                        <th scope="col">Número</th>
                                                        <th scope="col">Importe</th>
                                                        <th scope="col">Moneda</th>
                                                        <th scope="col">Cotización</th>
                                                        <th scope="col">Estado</th>
                                                        <th></th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {documentosAsociados.map((doc, index) => (
                                                        <tr key={doc.cuitEmisor + index}>
                                                            <td>{tiposFCE[doc.codTipoCmp]}</td>
                                                            <td>{doc.ptovta}</td>
                                                            <td>{doc.nroCmp}</td>
                                                            <td>{doc.importeTotal}</td>
                                                            <td>{doc.codMoneda}</td>
                                                            <td>{doc.cotizacionMoneda}</td>
                                                            <td>{doc.estado.estado}</td>

                                                            <td > 
                                                            <Actions openReject={() => this.handleOpenRejectForm(item, 'R')} openCancel={() => this.handleOpenRejectForm(item, 'C')} openAccept={() => this.openAcceptForm(item)} />
                                                            </td>

                                                        </tr>
                                                    ))}

                                                </tbody>
                                            </table>
                                        </div>
                                    </td>
                                </tr>

                                : ""}

                        </Fragment>
                    ))}
                    </tbody>
                </table>
                </div>
                </div>                                        
                
                <div className="d-flex justify-content-between p-1">
                    <div className="form-group">
                        <select className="custom-select my-1 mr-sm-2" >
                            <option value="1">5</option>
                            <option value="2">10</option>
                            <option value="3">20</option>
                        </select>
                    </div>
                    <div className="">
                    <TablePagination amountPages={2} selectionChanges={(e) => this.paginationChange(e)}/>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { invoiceReducer } = state;
    return {
        invoiceReducer
    };
}


const mapDispatchToProps = (dispatch) => {
    return {
        setFilteredPendingInvoices: (data) => { dispatch(setFilteredPendingInvoices(data)) },
        setSelectedInvoice: (data) => { dispatch(setInvoice(data)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Facturas)
