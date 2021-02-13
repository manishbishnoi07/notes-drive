import React from 'react'
import "./Button.css"
const Button = ({text,onClick,type,className}) => {
    return (
        <button type={type} onClick={onClick} className={`btn ${className}`}>{text}</button>
    )
}

export default Button
