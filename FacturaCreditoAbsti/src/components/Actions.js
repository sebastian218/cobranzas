//@ts-check
import React from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setInvoice } from '../redux/actions/invoice';

/* import RejectForm from './RejectForm' */

//import Axios from 'axios' to get the action to the webApi

class Actions extends React.Component {
    constructor(props) {
        super(props)

        this.handleClick = this.handleClick.bind(this);

    }

    static propTypes = {

    }

    handleClick(id) {

        switch (id) {
            case 'R':
                this.props.openReject()
                break
            case 'C':
                this.props.openCancel()
                break
            case 'A':
                this.props.openAccept()
                break
        }
    }



    render() {
        return (
            <React.Fragment>
                <div className="d-flex  justify-conetent-between align-items-center">
                    <button type="button" className="btn btn-success btn-sm mb-2 glyphicon glyphicon-ok action-buttons" onClick={() => this.handleClick('A')}>A</button>
                    <button type="button" className="btn btn-secondary btn-sm mb-2 glyphicon glyphicon-remove action-buttons" onClick={() => this.handleClick('R')}>R</button>
                    <button type="button" className="btn btn-danger btn-sm mb-2 glyphicon glyphicon-remove action-buttons" onClick={() => this.handleClick('C')}>CT</button>
                </div>
            </React.Fragment>
        )
    }
};

const mapStateToProps = (state) => {
    return {};
}

export default connect(mapStateToProps)(Actions)
