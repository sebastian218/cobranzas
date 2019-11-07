import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import { formatCurrency, onlyNumbres } from '../../helpers/helpers';
import { tiposRetenciones } from '../../constants/axiosResponse';

const TIPOPLACEHOLDER = { codigo: "Seleccione Tipo de retención" };

export class Retenciones extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: "DATA!",
            tipo: TIPOPLACEHOLDER,
            porcentaje: "",
            importe: "",
            motivo: "",
            retenciones: [],
            tiposRetencion: []
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    componentDidMount() {
        this.geTiposRetencion()
            .then(res => {
                this.setState({ tiposRetencion: res })
            })
    }


    onChange = e => {
        let value = e.target.value;
        if (e.target.name == "porcentaje") {
            value = onlyNumbres(value);
        }
        if (e.target.name == "importe") {
            formatCurrency(e.target);
            return this.setState({ [e.target.name]: e.target.value });

        }
        this.setState({
            [e.target.name]: value
        })
    }
    onSubmit(e) {
        e.preventDefault();
        if (this.isValidForm()) {
            this.crearRetencion();
        } else {

        }
    }
    crearRetencion() {
        const { tipo, porcentaje, importe, motivo, retenciones } = this.state;
        let retencion = {
            tipo: tipo,
            porcentaje: porcentaje,
            importe: importe,
            motivo: motivo
        }
        let retencionesJoined = [];
        if (retenciones.length > 0) {
            if (retenciones.find(ret => JSON.stringify(ret) == JSON.stringify(retencion)) != undefined) {
                return alert("Esta retención ya fué agregada")
            } else {
                retencionesJoined = retenciones.concat(retencion);
            }
        } else {
            retencionesJoined = retenciones.concat(retencion);
        }
        this.updateRetenciones(retencionesJoined)
        this.setState({
            tipo: TIPOPLACEHOLDER,
            porcentaje: "",
            importe: "",
            motivo: ""
        })
    }

    onBlur(e) {
        formatCurrency(e.target, "blur");
        this.setState({ [e.target.name]: e.target.value });
    }

    isValidForm() {
        const { tipo, porcentaje, importe, motivo } = this.state;
        return tipo != TIPOPLACEHOLDER.codigo && porcentaje != "" && porcentaje != "0" && importe != "" && importe != "$0.00" && importe != "$.00" && motivo != "";
    }

    deleteRetencion(retencion) {
        const { retenciones } = this.state;
        var stateRetenciones = [...retenciones];
        var retencionesAux = stateRetenciones.filter(ret => JSON.stringify(ret) != JSON.stringify(retencion));
        this.updateRetenciones(retencionesAux)
    }

    updateRetenciones(retenciones) {
        this.props.outputData(retenciones)
        this.setState((state) => ({ ...state, retenciones: retenciones }));
    }
    geTiposRetencion() {
        return new Promise((resolve, Reject) => {
            resolve(tiposRetenciones)
        })
    }

    render() {
        const { tipo, porcentaje, importe, motivo, retenciones, tiposRetencion } = this.state;
        return (
            <div className="p-2" >
                <Form className="filter-form" autoComplete="off" onSubmit={this.onSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} md="4" controlId="formGridState" >
                            <Form.Label>Tipo</Form.Label>
                            <Form.Control onChange={this.onChange} value={tipo.codigo} as="select" name="tipo">
                                <option disabled>{TIPOPLACEHOLDER.codigo}</option>
                                {tiposRetenciones.map((tipo, index) => (
                                    <option key={index} value={tipo.codigo}>{tipo.descripcion}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="formGridEmail">
                            <Form.Label>% ret</Form.Label>
                            <Form.Control onChange={this.onChange} value={porcentaje} type="text" placeholder="% ret" name="porcentaje" />
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="formGridPassword">
                            <Form.Label>Importe</Form.Label>
                            <Form.Control onChange={this.onChange} onBlur={this.onBlur} value={importe} type="text" placeholder="Importe ret" name="importe" />
                        </Form.Group>

                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} md="12" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Motivo</Form.Label>
                            <Form.Control onChange={this.onChange} value={motivo} name="motivo" as="textarea" rows="1" placeholder="Ingrese el motivo de procentaje de retención" />
                        </Form.Group>
                    </Form.Row>
                    <Row className="justify-content-md-end pb-0 pr-2 pl-2  pt-0">
                        <Button variant="primary" type="submit" className="btn-sm">
                            Agregar
                        </Button>
                    </Row>

                </Form>

                <div className="retenciones-table mt-3 scroll">
                    <table className="table table-responsive">
                        <thead>
                            <tr>

                                <th style={{ border: "none", backgroundColor: "#F5F5F5" }} scope="col">Tipo de Retención</th>
                                <th style={{ border: "none", backgroundColor: "#F5F5F5" }} scope="col">Porcentaje</th>
                                <th style={{ border: "none", backgroundColor: "#F5F5F5" }} scope="col">Importe</th>
                                <th style={{ border: "none", backgroundColor: "#F5F5F5" }} scope="col">Motivo</th>
                                <th style={{ border: "none" }}></th>
                                <th style={{ border: "none" }}></th>

                            </tr>
                        </thead>
                        <tbody>

                            {retenciones.map((retencion, idx) => (
                                <tr key={idx}>
                                    <td>{tiposRetenciones.filter(ret => ret.codigo == retencion.tipo)[0].descripcion}</td>
                                    <td >{retencion.porcentaje}</td>
                                    <td >{retencion.importe}</td>
                                    <td >{retencion.motivo}</td>
                                    <td style={{ border: "none" }}>
                                        <Button variant="primary" type="button" className="btn-sm action-buttons" onClick={() => this.deleteRetencion(retencion)} >
                                            Del
                                        </Button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Retenciones;
