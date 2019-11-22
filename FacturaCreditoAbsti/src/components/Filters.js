//@ts-check
import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Moment, { now } from 'moment';
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from 'date-fns/locale/es';
import { connect } from "react-redux";
import { onlyNumbres } from '../helpers/helpers';
import { setAllInvoices, setAllPendingInvoices, setFilteredPendingInvoices, setFilteredInvoices } from '../redux/actions/invoice';
import { createMessage } from '../redux/actions/alerts.actions';
import { ALERT } from '../constants/alertsTypes';

registerLocale('es', es)
setDefaultLocale('es');



const ESTADOPLACEHOLDER = "Estado";
const FECHAPLACEHOLDER = "Tipo Fecha";
class Filters extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            empresa: "",
            cuit: "",
            estado: ESTADOPLACEHOLDER,
            tipoFecha: FECHAPLACEHOLDER,
            desde: null,
            hasta: null,

        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.desdeDateChange = this.desdeDateChange.bind(this);
        this.hastaDateChange = this.hastaDateChange.bind(this);
        this.handleLimpiar = this.handleLimpiar.bind(this);
    }
    componentDidMount() {

    }

    onSubmit = e => {
        e.preventDefault();

        if (!this.isInvalidForm()) {

            let searchValues = this.returnSearchInputs();
            this.props.emitSearchValues(searchValues);
            console.log("SEARCH VALUES EMITTER", searchValues);
        } else {
            this.props.createAlert("Debe ingresar un parametro de busqueda", ALERT);
        }

    }

    returnSearchInputs() {
        const { empresa, cuit, estado, tipoFecha, desde, hasta } = this.state;
        let search = []

        if (empresa != "") {
            search['razonSocialEmi'] = empresa;
        }
        if (cuit != "") {
            search['cuitEmisor'] = cuit;
        }
        if (estado != ESTADOPLACEHOLDER) {
            search["estado"] = estado;
        }
        if (tipoFecha != FECHAPLACEHOLDER) {
            search["tipoFecha"] = tipoFecha;
        }
        if (desde != null) {
            search["desde"] = desde;
        }
        if (hasta != null) {
            search["hasta"] = desde;
        }

        return search;
    }

    isInvalidForm() {
        const { empresa, cuit, estado, tipoFecha, desde, hasta } = this.state;
        return empresa == "" && cuit == "" && estado == ESTADOPLACEHOLDER && tipoFecha == FECHAPLACEHOLDER && desde == null && hasta == null;
    }
    onChange = e => {
        let value = e.target.value;
        if (e.target.name == "cuit") {
            value = onlyNumbres(e.target.value)
        }
        this.setState({
            [e.target.name]: value
        })
    }
    desdeDateChange = date => {
        this.setState({
            desde: date
        })
    };
    hastaDateChange = date => {
        this.setState({
            hasta: date
        })
    }
    handleLimpiar() {

        this.setState({
            empresa: "",
            cuit: "",
            estado: ESTADOPLACEHOLDER,
            tipoFecha: FECHAPLACEHOLDER,
            desde: null,
            hasta: null,
        })
        if (!this.isInvalidForm()) {
            this.props.emitSearchValues(null)
        }

    }

    render() {
        const { empresa, cuit, estado, tipoFecha, desde, hasta } = this.state;
        return (
            <div className="">
                <Form className="" autoComplete="off" onSubmit={this.onSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} md="2" controlId="formGridEmail">
                            {/* <Form.Label>Empresa</Form.Label> */}
                            <Form.Control onChange={this.onChange} value={empresa} type="text" placeholder="Ingresar Empresa" name="empresa" />
                        </Form.Group>

                        <Form.Group as={Col} md="2" controlId="formGridPassword">
                            {/* <Form.Label>Cuit</Form.Label> */}
                            <Form.Control onChange={this.onChange} value={cuit} type="text" placeholder="Ingresar Cuit" name="cuit" />
                        </Form.Group>

                        <Form.Group as={Col} md="2" controlId="formGridState" >
                            {/* <Form.Label>Estado</Form.Label> */}
                            <Form.Control onChange={this.onChange} value={estado} as="select" name="estado">
                                <option disabled>{ESTADOPLACEHOLDER}</option>
                                <option value={valuesEnum.pendienteRecepcion}>Pendiente Recepción</option>
                                <option value={valuesEnum.recepcionado}>Recepcionado</option>
                                <option value={valuesEnum.aceptado}>Aceptado</option>
                                <option value={valuesEnum.rechazado}>Rechazado</option>
                                <option value={valuesEnum.informada}>Informada al agente de depósito</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} md="2" controlId="formGridState">
                            {/* <Form.Label>Tipo Fecha</Form.Label> */}
                            <Form.Control onChange={this.onChange} value={tipoFecha} as="select" name="tipoFecha">
                                <option disabled>{FECHAPLACEHOLDER}</option>
                                <option value={valuesEnum.emision}>Emisión</option>
                                <option value={valuesEnum.disponibilidad}>Disponibilidad</option>
                                <option value={valuesEnum.vencimiento}>Vencimiento</option>
                                <option value={valuesEnum.aceptacion}>Aceptación</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} md="1" controlId="formGridCity">
                            {/* <Form.Label>Desde</Form.Label> */}
                            <div className="w-100 date-border " style={{ backgroundColor: tipoFecha == FECHAPLACEHOLDER ? "#e9ecef" : "" }}>
                                <DatePicker locale="es" dateFormat='dd/MM/yy' disabled={tipoFecha == FECHAPLACEHOLDER} placeholderText="Desde" onChange={this.desdeDateChange} value={desde} selected={desde} name="desde" className="form-control w-100" />
                            </div>
                        </Form.Group>
                        <Form.Group as={Col} md="1" controlId="formGridCity">
                            {/* <Form.Label>Hasta</Form.Label> */}
                            <div className="w-100 date-border " style={{ backgroundColor: tipoFecha == FECHAPLACEHOLDER ? "#e9ecef" : "" }}>
                                <DatePicker locale="es" dateFormat='dd/MM/yy' disabled={tipoFecha == FECHAPLACEHOLDER} placeholderText="Hasta" onChange={this.hastaDateChange} value={hasta} selected={hasta} name="hasta" className="form-control w-100" />
                            </div>
                        </Form.Group>
                        <Form.Group as={Col} md="1">
                            <Button variant="primary" type="submit" className="w-100">
                                Buscar
                        </Button>
                        </Form.Group >
                        <Form.Group as={Col} md="1">
                            <Button className="w-100" variant="outline-secondary" type="button" onClick={() => this.handleLimpiar()}>
                                Limpiar
                        </Button>
                        </Form.Group >


                    </Form.Row>
                    {/*                     <Row className="justify-content-md-end pb-0 pr-4 pl-4  pt-0">

                        <Button  variant="primary" type="submit" className="mr-2 btn btn-sm">
                            Buscar
                             </Button>

                        <Button className="btn-sm" variant="outline-secondary" type="button" onClick={() => this.handleLimpiar()}>
                            Limpiar
                        </Button>

                    </Row> */}

                </Form>
            </div>
        )
    }
}

const valuesEnum = {

    pendienteRecepcion: "Pendiente Recepción",
    recepcionado: "Recepcionado",
    aceptado: "Aceptado",
    rechazado: "Rechazado",
    informada: "Informada al agente de depósito",
    emision: "fechaEmision",
    disponibilidad: "fechaPuestaDispo",
    vencimiento: "fechaVenPago",
    aceptacion: "fechaVenAcep"


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
        setFilteredAllInvoices: (data) => { dispatch(setFilteredInvoices(data)) },
        setAllInvoices: (data) => { dispatch(setAllInvoices(data)) },
        setAllPendingInvoices: (data) => { dispatch(setAllPendingInvoices(data)) },
        createAlert: (msg, type) => { dispatch(createMessage(msg, type)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters)
