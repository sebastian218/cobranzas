import React, { Component } from 'react';




export class LoadingScreen extends Component {
    render() {
        return (
            <div style={wrapperstyle}>
                <div className="loading-gif">
                        <img width="200px" src="./Spinner.svg" />
                </div>
            </div>
        );
    }
}


export default LoadingScreen;


const wrapperstyle = {
    position: "absolute",
    top: "0px",
    bottom: "0px",
    left: "0px",
    right: "0px",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    display: "flex",
    zIndex: "999"
}