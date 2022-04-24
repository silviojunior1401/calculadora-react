import React from "react";
import './Button.css';

const Button = props => (
    <button 
        onClick={() => props.click && props.click(props.label)}
        className={`
            button
            ${props.operation ? 'operation' : ''}
            ${props.double ? 'double' : ''}
            ${props.triple ? 'triple' : ''}
        `}
    >
        {props.label}
    </button>
)

export default Button;