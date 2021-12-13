import React from "react";

export default props =>{
    const renderOptions = () => {
        const list = props.list || [];
        return list.map(option => (
            <option key={option.id} value={option.id}>{option.text}</option>
        ))
    }
    return(
        <div className={props.col}>
            <label className="text-left">{props.label}</label>
            <select value={props.value} onChange={props.onChange} className="form-control">
                {renderOptions()}
            </select>
        </div>
    )
}