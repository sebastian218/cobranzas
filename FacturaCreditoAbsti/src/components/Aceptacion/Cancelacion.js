import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import { formatCurrency, onlyNumbres } from '../../helpers/helpers';
import { formasCancelacion } from '../../constants/axiosResponse';


const FORMAPLACEHOLDER = {codigo: "Seleccione forma de cancelación"}

export class Cancelacion extends Component {
    
    constructor(props){
        super(props);
        this.state = {
             forma: FORMAPLACEHOLDER,
             monto: "",
             cancelaciones: [],
             formasCancelacion:[]
        }
        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.deleteCancelacion = this.deleteCancelacion.bind(this);
    }

    componentDidMount(){
        this.getFormasCancelacion()
            .then(res =>{
                 this.setState({formasCancelacion: res})
            })   
    }
    
    onSubmit(e) {
        e.preventDefault();
        if (this.isValidForm()) {
            this.crearCancelacion();
        } else {

        }
    }
    onChange = e => {
        let value = e.target.value;
        if (e.target.name == "monto") {
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
    isValidForm() {
        const { forma, monto } = this.state;
        return forma != FORMAPLACEHOLDER && monto != "" && monto != "$0.00" && monto !="$.00";
    }
    crearCancelacion() {
        const { forma, monto,cancelaciones,formasCancelacion} = this.state;
        let formaCancel = {};
        var stateFormasCancel = [...formasCancelacion];
        stateFormasCancel.forEach(form =>{
                if(form.codigo == forma){
                    formaCancel = form
                }
        });
        let cancelacion = {
            forma: formaCancel,
            monto: monto
        }
        
        let cancelacionesJoined = [];
        if (cancelaciones.length > 0) {
   
            if (cancelaciones.find( can => JSON.stringify(can) == JSON.stringify(cancelacion)) != undefined ) {
                return alert("cancelación previamente agregada")
            } else {
                cancelacionesJoined = cancelaciones.concat(cancelacion);
            }
        } else {
            cancelacionesJoined = cancelaciones.concat(cancelacion);
        }
        this.updateCancelaciones(cancelacionesJoined)
        this.setState({forma: FORMAPLACEHOLDER, monto: ""})
    }

    deleteCancelacion(cancelacion) {
        const { cancelaciones } = this.state;
        var stateCancelaciones = [...cancelaciones];
        var cancelacionesAux = stateCancelaciones.filter(can => JSON.stringify(can) != JSON.stringify(cancelacion));
        this.updateCancelaciones(cancelacionesAux)
    }

    updateCancelaciones(cancelaciones) {
        this.props.outputData(cancelaciones)
        this.setState((state) => ({ ...state, cancelaciones: cancelaciones }));
    }
    getFormasCancelacion(){
        return new Promise((resolve,Reject)=>{
            resolve(formasCancelacion)
        })
    }

    render() {
        const {forma, monto, cancelaciones,formasCancelacion} = this.state;
        return (
            <div className="p-2" >
            <Form className="filter-form" autoComplete="off" onSubmit={this.onSubmit}>
                <Form.Row>
                    <Form.Group as={Col} md="6" controlId="formGridState" >
                        <Form.Label>Forma de Cancelación</Form.Label>
                        <Form.Control onChange={this.onChange} value={forma.codigo} as="select" name="forma">
                            <option disabled>{FORMAPLACEHOLDER.codigo}</option>
                            {formasCancelacion.map((forma, index) => (
                                  <option key={index} value={forma.codigo}>{forma.descripcion}</option>
                               ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="formGridPassword">
                        <Form.Label>Monto</Form.Label>
                        <Form.Control onChange={this.onChange} onBlur={this.onBlur} value={monto} type="text" placeholder="Importe a cancelar PES" name="monto" />
                    </Form.Group>
                </Form.Row>
                <Row className="justify-content-md-end pb-0 pr-2 pl-2  pt-0">
                    <Button variant="primary" type="submit"  className="btn-sm">
                        Agregar
                    </Button>
                </Row>

            </Form>

            <div className="retenciones-table mt-2 scroll">
                <table className="table table-responsive">
                    <thead>
                        <tr>

                            <th style={{ border: "none", backgroundColor: "#F5F5F5" }} scope="col">Forma de Cancelación</th>
                            <th style={{ border: "none", backgroundColor: "#F5F5F5" }} scope="col">Importe PES</th>
                            <th style={{ border: "none" }}></th>
                            <th style={{ border: "none" }}></th>

                        </tr>
                    </thead>
                    <tbody>

                        {cancelaciones.map((cancelacion, idx) => (
                            <tr key={idx}>
                                <td>{ formasCancelacion.filter(forma => forma.codigo == cancelacion.forma.codigo)[0].descripcion }</td>
                                <td >{cancelacion.monto}</td>
                                <td colSpan="2" style={{ border: "none"}} >
                                    <Button variant="primary" type="button" className="btn-sm" onClick={() => this.deleteCancelacion(cancelacion)} >
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

export default Cancelacion;
