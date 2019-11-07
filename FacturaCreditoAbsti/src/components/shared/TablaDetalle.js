import React, { Component } from 'react';



export class TablaDetalle extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tableData: [],
            tc:[]
        }
    }

    componentDidMount() {
        let columns = Object.getOwnPropertyNames(this.props.data);
        this.setState({ tc: columns , tableData: this.props.data});
    }

    render() {
        const {tc,tableData} = this.state ;
        return (
            <div className="x-auto">
                <table className="table ">
                    <thead>
                        <tr>
                            {tc.map((col) =>(
                                <th key={col} id={col} style={{border: "none",backgroundColor:"#F5F5F5"}} scope="col">{tableData[col].col}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {tc.map((col)=>(
                                <td key={col} >{tableData[col].data}</td>
                            ))}
                        </tr>
                    </tbody>
                </table>

            </div>
        );
    }
}


export default TablaDetalle;

