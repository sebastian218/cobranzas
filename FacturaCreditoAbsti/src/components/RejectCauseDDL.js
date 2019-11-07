import React from 'react'
import { motivosRechazo } from '../constants/axiosResponse';


class RejectCauseDDL extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            motivo: { codigo: "Seleccione un motivo" },
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const value = this.props.selectOptions.filter(motivo => motivo.codigo == e.target.value);
        this.setState({ motivo: value[0] });
        this.props.onChange(value[0]);
    }

    render() {
        const { motivo } = this.state;
        return (
            <div className="form-group">
                <label htmlFor={this.props.name}>Motivo</label>
                <select className="form-control" name={this.props.name} value={motivo.codigo} onChange={this.handleChange}>
                    <option disabled >Seleccione un motivo</option>
                    {this.props.selectOptions.map((motivo, index) => (
                        <option key={index} value={motivo.codigo}>{motivo.descripcion}</option>
                    ))}
                </select>
            </div>
        )
    };
}

export default RejectCauseDDL;
