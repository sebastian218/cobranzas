import React, { Component } from 'react';
import Popup from 'reactjs-popup'
import TablaDetalle from '../shared/TablaDetalle';
import { connect } from "react-redux";
import LoadingScreen from '../shared/LoadingScreen';
import { setAllInvoices, setAllPendingInvoices, getInvoices } from '../../redux/actions/invoice';
import { createMessage } from '../../redux/actions/alerts.actions';
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Retenciones from './Retenciones';
import Cancelacion from './Cancelacion';
import { formatCurrency, toNumberFormat, roundNumber, toNumber } from '../../helpers/helpers';
import axios from 'axios';
import { tiposFCE } from '../../constants/tiposFCE';
import { getOnlyAsociatedDocuments } from '../../constants/axiosResponse';
import AceptacionParams from './AceptacionParams';



export class AceptacionForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            tabs: ["aceptacion", "retenciones", "cancelacion", "importes"],
            activeKey: "aceptacion",
            documentosAsociados: [],
            montoTotalNC: 0,
            montoTotalND: 0,
            retenciones: [],
            cancelaciones: [],
            importeEmbargo: " ",
            importeTotal: "",
            active: false

        }
        this.handleClose = this.handleClose.bind(this);
        this.handleActiveTab = this.handleActiveTab.bind(this);
        this.setKey = this.setKey.bind(this);
        this.getRetencionesData = this.getRetencionesData.bind(this);
        this.getCancelacionesData = this.getCancelacionesData.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.getMontToatalRetenciones = this.getMontToatalRetenciones.bind(this);
        this.getImporteTotalCancelado = this.getImporteTotalCancelado.bind(this);
    }

    componentDidMount() {

    }
    componentDidUpdate(prevProps) {
        const { invoiceReducer } = this.props;
        if (invoiceReducer.selectedInvoice !== prevProps.invoiceReducer.selectedInvoice) {

            this.clearState()
            this.getAsociatedDocumnets()
                .then(asociatedDocs => {
                    this.setState({ documentosAsociados: asociatedDocs });
                    this.calcularTotalNCND(asociatedDocs);
                })

        }

    }

    handleClose() {

        this.setState({ activeKey: "aceptacion", retenciones: [], cancelaciones: [], importeEmbargo: "" })
        this.props.handleClose()
    }
    clearState() {
        this.setState({ activeKey: "aceptacion", retenciones: [], cancelaciones: [], importeEmbargo: "", documentosAsociados: [], montoTotalNC: 0, montoTotalND: 0 })
    }
    handleActiveTab() {
        const { tabs, activeKey, cancelaciones, retenciones, importeEmbargo, documentosAsociados } = this.state;
        const { selectedInvoice } = this.props.invoiceReducer;
        let tabIndex = tabs.findIndex(tab => tab == activeKey);

        if (tabIndex + 1 <= tabs.length && activeKey != "importes") {
            this.setState({ activeKey: tabs[tabIndex + 1] });
        }
        if (activeKey == "importes") {

            // SUBMIT DATA ACÁ SE PROCESAN TODOS LOS DATOS PARA LA ACEPTACIÓN
            let datosAceptacion = new AceptacionParams(
                selectedInvoice,
                documentosAsociados,
                cancelaciones,
                retenciones,
                this.getImporteTotalCancelado("number"),
                this.getMontToatalRetenciones("number"),
                roundNumber(toNumber(importeEmbargo)),
                roundNumber(this.calcularSaldoAceptado())
            ).getParams();
            console.log(datosAceptacion);
            //Aceptar Factura
            /* this.aceptarFactura(datosAceptacion)
                .then(() => {
                    getInvoices(this.props.cuit)
                        .then(res => {
                            this.props.setAllInvoices(res.allInvoices)
                            this.props.setAllPendingInvoices(res.allPending)
                            //SUCCESS cierro modal toast de succes
                        })
                        .catch(err => {
                            //cierro modal y toast de error 
                        })

                })
                .catch(err => {
                    //cierro modal y toast de error 
                }) */
        }


    }
    onChange = e => {
        let value = e.target.value;
        if (e.target.name == "importeEmbargo") {
            formatCurrency(e.target);
            return this.setState({ [e.target.name]: e.target.value });

        }
        this.setState({
            [e.target.name]: value
        })
    }
    onBlur(e) {
        formatCurrency(e.target, "blur");
        this.setState({ [e.target.name]: e.target.value });
    }
    setKey(k) {
        this.setState({ activeKey: k })
    }
    getRetencionesData(data) {
        this.setState({ retenciones: data })
    }
    getCancelacionesData(data) {
        this.setState({ cancelaciones: data })
    }
    getMontToatalRetenciones(format) {
        const { retenciones } = this.state;
        let monto = 0;
        retenciones.forEach(retencion => {
            monto += toNumber(retencion.importe) /* Number(retencion.importe.substr(1).split('.').join("").replace(/,/g, '.')) */
        });
        if (format == "number") {
            return monto;
        }
        if (format == "formateado") {
            return toNumberFormat(monto.toFixed(2));
        }
    }
    getImporteTotalCancelado(format) {
        const { cancelaciones } = this.state;
        let total = 0;
        cancelaciones.forEach(cancelacion => {
            total += toNumber(cancelacion.monto) /* Number(cancelacion.monto.substr(1).split('.').join("").replace(/,/g, '.')) */
        });
        if (format == "number") {
            return total;
        }
        if (format == "formateado") {
            return toNumberFormat(total.toFixed(2));
        }

    }
    calcularSaldoAceptado() {
        const { invoiceReducer } = this.props;
        const { importeEmbargo, montoTotalNC, montoTotalND } = this.state;
        let embargoNumber = Number(importeEmbargo.substr(1).split('.').join("").replace(/,/g, '.'))
        return Number(invoiceReducer.selectedInvoice.importeTotal) - this.getImporteTotalCancelado("number") - this.getMontToatalRetenciones("number") - embargoNumber - montoTotalNC + montoTotalND;
    }

    calcularTotalNCND(asociatedDocs) {
        let totalNC = 0;
        let totalND = 0;
        asociatedDocs.forEach(doc => {
            switch (doc.codTipoCmp) {
                case 202:
                case 207:
                case 212:
                    totalND += doc.importeTotal
                    break
                case 203:
                case 208:
                case 213:
                    totalNC += doc.importeTotal
                    break
            }
        })
        this.setState({ montoTotalNC: totalNC, montoTotalND: totalND })
    }

    getAsociatedDocumnets() {
        const { selectedInvoice } = this.props.invoiceReducer;
        this.isLoading(true)
        // MOCK
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                this.isLoading(false)
                resolve(getOnlyAsociatedDocuments.data.arrayComprobantes)
            }, 2000)
        })
        // SOLUTION
        /*         return new Promise((resolve,reject)=>{
                  axios.get(`api/AFIP/GetOnlyAsociatedDocuments/${selectedInvoice.cuitEmisor}/${selectedInvoice.codTipoCmp}/${selectedInvoice.ptoVta}/${selectedInvoice.nroCmp}`)
                       .then(response => {
                            resolve(response.data.arrayComprobantes);
                       })
                       .catch(error => {
                           //mensaje error
                           reject(error)
                       })   
            }) */
    }
    aceptarFactura(params) {
        this.isLoading(true);
        return new Promise((resolve, reject) => {
            axios.post('api/AFIP/AcceptInvoice', params)
                .then(res => {
                    //SUCCESS
                    resolve()
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
    isLoading(boolean) {
        this.setState({ loading: boolean });
    }

    render() {
        const { loading, tabs, activeKey, importeEmbargo, retenciones, documentosAsociados, montoTotalNC, montoTotalND } = this.state;
        return (
            <Popup className="modal" id="aceptacion" open={this.props.open} modal onClose={() => this.handleClose()} closeOnDocumentClick={false}>
                <div>
                    {loading ? <LoadingScreen /> : ''}
                    <div className="modal-header">
                        <h5 className="modal-title">Aceptación Factura de crédito</h5>
                        <a className="close" style={{ cursor: "pointer" }} onClick={() => this.handleClose()}>
                            &times;
                    </a>
                    </div>
                    <div className="modal-body" style={{ minHeight: "490px" }}>
                        <Tabs className="mt-4" activeKey={activeKey} onSelect={(k) => { this.setKey(k) }} id="controlled-tab-example">
                            <Tab eventKey="aceptacion" title="Aceptación">
                                <div className="p-2">
                                    <small className="text-secondary mt-2">Detalle FCE</small>
                                    <TablaDetalle data={this.props.invoiceReducer.selectedDetalle} />
                                    <small className="text-secondary">Comprobantes Asociados a la factura de crédito</small>
                                    <div className="x-auto">
                                        <table className="table">
                                            <thead>
                                                <tr>

                                                    <th style={{ border: "none", backgroundColor: "#F5F5F5" }} scope="col">Tipo Doc</th>
                                                    <th style={{ border: "none", backgroundColor: "#F5F5F5" }} scope="col">Pto.Vta.</th>
                                                    <th style={{ border: "none", backgroundColor: "#F5F5F5" }} scope="col">Número</th>
                                                    <th style={{ border: "none", backgroundColor: "#F5F5F5" }} scope="col">Importe</th>
                                                    <th style={{ border: "none", backgroundColor: "#F5F5F5" }} scope="col">Moneda</th>
                                                    <th style={{ border: "none", backgroundColor: "#F5F5F5" }} scope="col">Cotización</th>
                                                    <th style={{ border: "none", backgroundColor: "#F5F5F5" }} scope="col">Estado</th>

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


                                                    </tr>
                                                ))}

                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                            </Tab>
                            <Tab eventKey="retenciones" title="Retenciones">
                                <Retenciones outputData={(data) => { this.getRetencionesData(data) }} />
                            </Tab>
                            <Tab eventKey="cancelacion" title="Cancelación">
                                <Cancelacion outputData={(data) => { this.getCancelacionesData(data) }} />

                            </Tab>
                            <Tab eventKey="importes" title="Importes">
                                <table class="table table-borderless table-responsive">
                                    <thead>
                                        <tr>
                                            <th scope="col"></th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Importe Total de la Factura:  </td>
                                            <td className="td-resumen"><span>$</span>  {toNumberFormat(this.props.invoiceReducer.selectedInvoice.importeTotal)}</td>
                                        </tr>
                                        <tr>
                                            <td>Importe Total de Notas de Débito:</td>
                                            <td className="td-resumen"><span>$</span> {toNumberFormat(montoTotalND)}</td>
                                        </tr>
                                        <tr>
                                            <td>Importe Total de Notas de Crédito:</td>
                                            <td className="td-resumen"><span>$</span> {toNumberFormat(montoTotalNC)}</td>
                                        </tr>
                                        <tr>
                                            <td>Importe Total de Retenciones:</td>
                                            <td className="td-resumen"><span>$</span> {this.getMontToatalRetenciones("formateado")}</td>
                                        </tr>
                                        <tr>
                                            <td>Importe De Embargos:</td>
                                            <td> <input className="form-control text-right" placeholder="$0,00" autoComplete="off"  onBlur={this.onBlur} onChange={this.onChange} value={importeEmbargo} name="importeEmbargo" />  </td>
                                        </tr>
                                        <tr>
                                            <td>Importe Cancelado:</td>
                                            <td className="td-resumen"><span>$</span> {this.getImporteTotalCancelado("formateado")}</td>
                                        </tr>
                                        <tr style={{ borderTop: "solid" }}>
                                            <td>Saldo Aceptado:</td>
                                            <td className="td-resumen"><span>$</span> {toNumberFormat(this.calcularSaldoAceptado())}</td>
                                        </tr>
                                    </tbody>
                                </table>

                            </Tab>
                        </Tabs>

                    </div>
                    <div className="modal-footer justify-content-end">
                        <button className="btn btn-secondary btn-sm" onClick={() => this.handleClose()}>Cancelar</button>
                        <button className="btn btn-primary btn-sm" onClick={() => this.handleActiveTab()}>{activeKey == "importes" ? "Confirmar" : "Siguiente"}</button>
                    </div>
                </div>
            </Popup>
        );

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
        setAllInvoices: (data) => { dispatch(setAllInvoices(data)) },
        setAllPendingInvoices: (data) => { dispatch(setAllPendingInvoices(data)) },
        createAlert: (msg, type) => { dispatch(createMessage(msg, type)) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AceptacionForm);
