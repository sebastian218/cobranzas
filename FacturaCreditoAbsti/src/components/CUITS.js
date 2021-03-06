//@ts-check
import React from 'react'
import axios from 'axios'
import Facturas from './Facturas'
import { GetCompanyCuits, GetCreditInvoices, invoiceResponse, CheckStatus, GetAllInvoices, GetCompanyCuits1 } from '../constants/axiosResponse'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Filters from './Filters'
import { connect } from "react-redux";
import { checkConnection } from '../redux/actions/checkConnection.actions'
import Offline from './Offline'
import CuentasCorrientes from './CuentasCorrientes'
import { setAllInvoices, setAllPendingInvoices, getAllInvoices, getAllPendingInvoices } from '../redux/actions/invoice'
import { createMessage } from '../redux/actions/alerts.actions'
import { SUCCESS } from '../constants/alertsTypes'
import LoadingScreen from './shared/LoadingScreen'
import { setCuit } from '../redux/actions/cuits.actions'


class Cuits extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            cuits: [],
            pendientes: [],
            total_pend_pages: 0,
            total_pending_invoices:0,
            total_allInv:0,
            total_allInv_pages: 0,
            allInvoices: [],
            error: "",
            selectedCuit: "",
            selectedName: "",
            invoicesLoaded: false
        }
        this.GetInvoices = this.GetInvoices.bind(this);

    }

    componentDidMount() {
        this.props.checkConnections().then(() => {
            if (this.props.checkConnectionReducer.connectionSucces) {
                this.props.createAlert('Connection Success', SUCCESS);
                this.getCuits()
                    .then(() => {
                        if (this.state.cuits.length == 1) {
                            const { cuits } = this.state;
                            this.GetInvoices(cuits[0].cuit_item, cuits[0].company_name);
                        }
                    });
            }
        }).catch(() => {

        })
    }

    GetInvoices(cuit, name) {
        this.isLoading(true);
        return new Promise((resolve, reject) => {
            this.setState({ selectedCuit: cuit, selectedName: name });
            this.props.setSelectedCuit(cuit)
            getAllPendingInvoices(cuit)
                .then(response => {
                    
                    this.props.setAllPendingInvoices(response.data)
                    this.setState((state)=> ({...state, pendientes: response.data, total_pend_pages: response.total_pages, total_pending_invoices: response.total }));
                    getAllInvoices(cuit)
                        .then(response => {
                            setTimeout(()=>{
                                this.props.setAllInvoices(response.data)
                                this.setState({ allInvoices: response.data, total_allInv_pages: response.total_pages,total_allInv: response.total });
    
                                this.setState({ invoicesLoaded: true })
                                this.isLoading(false);
                            },1000)
                            resolve()
                        })
                        .catch(error => {
                            //do things with errorre
                            reject()
                        })
                })
                .catch(error => {
                    //do things with error
                    reject()
                })

        })
    }

    isLoading(boolean){
        this.setState({loading: boolean});
    }


    getCuits() {

        return new Promise((resolve, reject) => {
            const onResponse = new Promise((resolve, reject) => {
                resolve(GetCompanyCuits)
            })
            onResponse.then(response => {

                this.setState((state) => ({ ...state, cuits: response.data.data }));

                resolve()
            });
        })
        /* const self = this */
        //TODO: MOCK ABSTI
        //axios.get('./GetCompanyCuits.asp', { params: { company: self.state.company } });

    }

    render() {
        const { pendientes, cuits, selectedCuit, selectedName, invoicesLoaded,loading,total_pend_pages,total_allInv_pages, total_pending_invoices,total_allInv } = this.state;

        if (this.props.checkConnectionReducer.connectionSucces) {
            return (
                <div className="panel">
                    {loading ? <LoadingScreen /> : ''}
                    <div className="panel-header">
                    </div>
                    <div className="list-group">
                        {this.state.cuits.length > 1 ? this.state.cuits.map(item => (
                            <CUIT
                                isActive={selectedCuit == item.cuit_item}
                                key={item.cuit_item}
                                id={item.cuit_item}
                                cuit={item.cuit_item}
                                rznSocial={item.company_name}
                                onClick={() => this.GetInvoices(item.cuit_item, item.company_name)}
                            />
                        )) : ""}
                    </div>
                    {/*  {invoicesLoaded ? <Filters /> : ""}  */}
                    {invoicesLoaded ?
                        <Tabs className="mt-4" defaultActiveKey="pendientes" id="uncontrolled-tab-example">
                            <Tab eventKey="pendientes" title="Pendientes">
                                <Facturas
                                    facturas={this.props.invoiceReducer.allPendingInvoices}
                                    cuit={selectedCuit}
                                    totalInvoices={total_pending_invoices}
                                    amount_pages={total_pend_pages}
                                    rznSocial={selectedName}
                                    obs={this.state.error}
                                    showActions={true}
                                />
                            </Tab>
                            <Tab eventKey="cuentasCorrientes" title="Cuentas Corrientes">
                                <CuentasCorrientes
                                    facturas={this.props.invoiceReducer.allInvoices}
                                    cuit={selectedCuit}
                                    totalInvoices={total_allInv}
                                    amount_pages={total_allInv_pages}
                                    rznSocial={selectedName}
                                    obs={this.state.error}
                                />
                            </Tab>
                        </Tabs>
                        : ""}
                </div>
            )

        } else if (!this.props.checkConnectionReducer.connectionSucces && !this.props.appReducer.isLoading) {

            return (

                <Offline />
            );

        } else if (this.props.appReducer.isLoading) {
            return (

                <div>
                    <strong >Espera, por favor....</strong> 
                </div>


            );

        }
    }


}


class CUIT extends React.Component {

    constructor(props) {
        super(props)
        this.state = {}
        this.handleClick = () => {
         return !this.props.isActive ? this.props.onClick() : "";
        }
    }

    render() {
        return (
            <div className="list-group-item" key={this.props.id}>
                <button className="btn btn-lg btn-block w-100 cuit-button" style={{ backgroundColor: this.props.isActive ? "rgba(192, 192, 192,0.6)" : "#E8E8E8" }} onClick={this.handleClick}>
                     
                      {this.props.rznSocial + " (" + this.props.cuit + ")"  } {this.props.isActive ? <img width="20" src="./success.svg"/> : ""}
                
                </button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { invoiceReducer, appReducer, checkConnectionReducer } = state;
    return {
        appReducer,
        checkConnectionReducer,
        invoiceReducer
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        checkConnections: () => { return checkConnection(dispatch) },
        setAllInvoices: (data) => { dispatch(setAllInvoices(data)) },
        setAllPendingInvoices: (data) => { dispatch(setAllPendingInvoices(data)) },
        createAlert: (msg, type) => { dispatch(createMessage(msg, type)) },
        setSelectedCuit: (cuit) => {dispatch(setCuit(cuit))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cuits)