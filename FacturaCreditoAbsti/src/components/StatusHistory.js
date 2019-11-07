import React, { Component } from 'react';
import Popup from 'reactjs-popup'
import TablaDetalle from './shared/TablaDetalle';
import Moment from 'moment';

const thStyle = {border: "none",backgroundColor:"#F5F5F5"}

export class StatusHistory extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Popup className="modal" open={this.props.open} modal onClose={() => this.props.onClose()}>
                <div>
                    <div className="modal-header">
                        <h5 className="modal-title">Historial de estados</h5>
                        <a className="close" style={{ cursor: "pointer" }} onClick={() => this.props.handleClose()}>
                            &times;
                    </a>
                    </div>
                    <div className="modal-body">
                        <div>
                            <table className="table ">
                                <thead>
                                    <tr>
                                        <th style={thStyle} key="usuairio" id="1" scope="col">Usuario</th>
                                        <th style={thStyle} key="fechaCambio" id="2" scope="col">Fecha Cambio</th>
                                        <th style={thStyle} key="estado" id="3" scope="col">Nuevo Estado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.data.map((rowData,index) => (
                                        <tr key={rowData + index}>
                                            <td key={rowData["Usuario"]} >{rowData["Usuario"]}</td>
                                            <td key={rowData["Fecha cambio"]} >{Moment(rowData["Fecha cambio"]).format('DD/MM/YYYY hh:mm:ss ') }</td>
                                            <td key={rowData["Nuevo Estado"]} >{rowData["Nuevo Estado"]}</td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </Popup>
        );
    }
}

export default StatusHistory;
