import React, { Component } from 'react';
import Actions from './Actions';
import Moment from 'moment';

export class CuentasCorrientes extends Component {

     constructor(props){
            super(props)
     }




    render() {
        return (
            <div>
 
            {/* <Filters /> TODO: agregar filtros en la historia posterios */}
            <h3 className="p-2">Comprobantes para {this.props.rznSocial + " (" + this.props.cuit + ")"}</h3>
            <table className="table table-responsive">
                <thead>
                    <tr>
                        <th>CUIT Emisor</th>
                        <th>Razón Social</th>
                        <th>Tipo Doc.</th>
                        <th>Pto Vta</th>
                        <th>Número</th>
                        <th>Importe</th>
                        <th>Moneda</th>
                        <th>Cotización</th>
                        <th>Estado</th>
                        <th>Fecha Em</th>
                        <th>Fecha Disp</th>
                        <th>Fecha Vto</th>
                        <th>Fecha Vto Acept</th>
                        <th>CAE</th>
                    </tr>
                </thead>
                <tbody>{this.props.allInvoices.map((item, key) => (
                    <tr key={'' + key}>
                        <td>{item.cuitEmisor}</td>
                        <td>{item.razonSocialEmi}</td>
                        <td>{item.codTipoCmp}</td>
                        <td>{item.ptovta}</td>
                        <td>{item.nroCmp}</td>
                        <td>{item.importeTotal}</td>
                        <td>{item.importecodMoneda}</td>
                        <td>{item.cotizacionMoneda}</td>
                        <Estado estado={item.estado.estado} />
                        <td>{Moment(item.fechaEmision).format('DD/MM/YYYY')}</td>
                        <td>{Moment(item.fechaPuestaDispo).format('DD/MM/YYYY')}</td>
                        <td>{Moment(item.fechaVenPago).format('DD/MM/YYYY')}</td>
                        <td>{Moment(item.fechaVenAcep).format('DD/MM/YYYY')}</td>
                        <td>{item.codAutorizacion}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>



);
    }
}
class Estado extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {

        return <td>{this.props.estado}</td>

        /*     switch(this.props.estado){
                case 1: {return <td>Pendiente Recepción</td>};
                case 2: {return <td>Recepcionado</td>};
                case 3: {return <td>Aceptado</td>};
                case "Rechazado": {return <td>Rechazado</td>};
                case 5: {return <td>Informada al agente de depósito</td>};
            } */
    }
}


export default CuentasCorrientes;



