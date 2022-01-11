import React from "react"
import PropTypes from "prop-types"
import "../styles/Button.css"

const Button = ({variant, text, action}) => {
    return(
        <button className={`btn btn-${variant}`} onClick={action}>
        {text}
        </button>
)
}

Button.propTypes = {
    todo: PropTypes.string.isRequired,
    variant: PropTypes.string.isRequired,
    action: PropTypes.func
}


export default Button;