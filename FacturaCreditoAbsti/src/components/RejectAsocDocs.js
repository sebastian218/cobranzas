//@ts-check
import React from 'react'
import Popup from 'reactjs-popup'
import RejectCauseDDL from './RejectCauseDDL'
import PropTypes from 'prop-types';
import TablaDetalle from './shared/TablaDetalle';
import { connect } from "react-redux";
import axios from 'axios';
import { getAllInvoices, getAllPendingInvoices, setAllInvoices, setAllPendingInvoices } from '../redux/actions/invoice';
import { motivosRechazo } from '../constants/axiosResponse';
import { formatNumber, formatCurrency } from '../helpers/helpers';
import { format } from 'date-fns';
import { createMessage } from '../redux/actions/alerts.actions';
import { ERROR, SUCCESS } from '../constants/alertsTypes';
import LoadingScreen from './shared/LoadingScreen';
import { tiposFCE } from '../constants/tiposFCE';



class RejectAsocDocs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            motivosRechazo: [],
            rejectCause: "",
            rejectDesc: "",
            monto: "",
            loading: false
        }
        this.handleRejectInvoice = this.handleRejectInvoice.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnBlur = this.handleOnBlur.bind(this);
        /*  this.handleClose = this.handleOnChange.bind(this); */
    }

    componentDidMount() {

        //SOLUTION
        /*         
                        this.getMotivosRechazo()
                            .then(response => {
                                this.setState({ motivosRechazo: response.data.codigoDescripcionReturn.arrayCodigoDescripcion })
                            })
                      
        */

        //MOCK
        const onResponse = new Promise((resolve, reject) => {
            resolve(motivosRechazo)
        })
        onResponse.then(response => {
            this.setState({ motivosRechazo: response.data.codigoDescripcionReturn.arrayCodigoDescripcion })
            /* putResponse(response.data); */
        });
        onResponse.catch(error => {
            /* putResponse(error.message); */
        });
    }

    handleClose() {
        this.props.handleClose();
        this.setState({ rejectCause: {}, rejectDesc: "", monto: "" })
    }

    handleOnChange(e) {
        if (e.codigo) {
            this.setState({ rejectCause: e })
        } else {
            if (e.target.name == "monto") {
                formatCurrency(e.target);
                this.setState({ [e.target.name]: e.target.value });

            } else {
                this.setState({ [e.target.name]: e.target.value });
            }

        }
    }

    handleOnBlur(e) {
        formatCurrency(e.target, "blur");
        this.setState({ [e.target.name]: e.target.value });
    }

    handleRejectInvoice() {
        this.setState({ loading: true })
        const { cuitEmisor, codTipoCmp, ptovta, nroCmp } = this.props.invoiceReducer.selectedInvoice;
        const { rejectCause, rejectDesc } = this.state;
        const { paginationParams } = this.props;




        this.handleClose()

    }

    getMotivosRechazo() {
        return new Promise((resolve, reject) => {
            axios.get('api/Values/GetDescMotivosRechazos/')
                .then(res => {

                    resolve(res)
                })
                .catch(err => { reject(err) })
        })
    }



    rejectCancelInvoice(requestBody) {

        // MOCK
        return new Promise((resolve, reject) => {

            setTimeout(() => {
                resolve()
            }, 2000)

        })
        // SOLUTION
        /*   return new Promise((resolve, reject) => {
              console.log(this.getRejectCancelEndpoint())
              axios.post(this.getRejectCancelEndpoint(), requestBody)
                  .then(res => {
                      console.log(res)
                      resolve(res)
                  })
                  .catch(err => reject(err))
          }) */
    }

    getRejectCancelEndpoint() {
        return this.props.actionType == "C" ? 'api/AFIP/CancelInvoice/' : 'api/AFIP/RejectInvoice/';
    }



    render() {
        const { rejectCause, rejectDesc, monto, motivosRechazo, loading } = this.state;
        const { nota } = this.props;
        return (
            <Popup className="modal" open={this.props.open} modal onClose={() => this.handleClose()} closeOnDocumentClick={false}>
                <div>
                    {loading ? <LoadingScreen /> : ''}
                    <div className="modal-header">
                        <h5 className="modal-title">Rechazar {nota !=null ? tiposFCE[nota.codTipoCmp]:""}</h5>
                        <a className="close" style={{ cursor: "pointer" }} onClick={() => this.handleClose()}>
                            &times;
                        </a>
                    </div>
                    <div className="modal-body">
                        <table className="table table-sm tabla-facturas ">
                            <thead>
                                <tr>
                                    <th className="border-0" scope="col">Tipo Doc</th>
                                    <th className="border-0" scope="col">Pto.Vta.</th>
                                    <th className="border-0" scope="col">Número</th>
                                    <th className="border-0" scope="col">Importe</th>
                                    <th className="border-0" scope="col">Moneda</th>
                                    <th className="border-0" scope="col">Cotización</th>
                                    <th className="border-0" scope="col">Estado</th>
                                    <th className="border-0" ></th>

                                </tr>
                            </thead>
                            <tbody>
                                {nota != null ?
                                    <tr>

                                        <td>{tiposFCE[nota.codTipoCmp]}</td>
                                        <td>{nota.ptovta}</td>
                                        <td>{nota.nroCmp}</td>
                                        <td>{nota.importeTotal}</td>
                                        <td>{nota.codMoneda}</td>
                                        <td>{nota.cotizacionMoneda}</td>
                                        <td>{nota.estado.estado}</td>
                                    </tr>
                                    :
                                    ""}

                            </tbody>
                        </table>




                        <RejectCauseDDL name='rejectCause' selectOptions={motivosRechazo} onChange={this.handleOnChange} />
                        {this.props.actionType == "C" ? <div className='form-group'>  <label htmlFor="monto">Monto</label> <input autoComplete="off" className="form-control" onBlur={this.handleOnBlur} pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" id="currency-field" data-type="currency" value={monto} onChange={this.handleOnChange} name="monto" placeholder="Ingrese monto" /> </div> : <div className="form-group"> <label htmlFor="rejectDesc">Justificación</label> <textarea className="form-control" placeholder="Ingrese una justificación" name='rejectDesc' onChange={this.handleOnChange} /> </div>}
                    </div>
                    <div className="modal-footer justify-content-end">
                        <button className="btn btn-primary btn-sm" onClick={() => this.handleRejectInvoice()} disabled={rejectCause == "" || this.props.actionType == "R" ? rejectDesc == "" : monto == ""}>{this.props.actionType == "C" ? 'Enviar cancelacion' : 'Rechazar'}</button>
                        <button className="btn btn-secondary btn-sm" onClick={() => this.handleClose()}>Cancelar</button>
                    </div>
                </div>
            </Popup>
        )
    }
};


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

export default connect(mapStateToProps, mapDispatchToProps)(RejectAsocDocs)

RejectAsocDocs.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired
};

