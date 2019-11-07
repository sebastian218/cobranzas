//@ts-check
import React from 'react'

class Offline extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-10 col-md-offset-1">
                        <div className="alert text-dark alert-warning ">
                            <strong>Servicio no disponible!</strong> El servicio de AFIP no responde. Por favor intente nuevamente más tarde.
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Offline
