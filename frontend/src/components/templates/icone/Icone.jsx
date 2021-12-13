import React from "react";
import './icone.css';

export default props => {
    return (
        <div className="icone">
            <button className={"btn btn-" + props.estilo} onClick={props.onClick}>
                <i className={"fa fa-"+props.icone}></i>
            </button>
        </div>
    )
}