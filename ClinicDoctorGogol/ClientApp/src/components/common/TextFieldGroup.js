import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import '../common/TextFieldGroup.css';

const TextFieldGroup = ({
    field,
    value,
    label,
    icon,
    type,
    autoComplete,
    error,
    onChange
}) => {
    return (
        <>
            <div className="form-group">
                <span>
                    {label}
                </span>
                <div className="input-group">
                <div className="input-group-prepend ">
                    <span className="input-group-text" style={{backgroundColor:'#E0F2F1', color:'#00796B'}}> <i className={icon}></i> </span>
                </div>
                <input className={classnames("form-control", {"is-invalid": !!error})}
                        onChange={onChange}
                        autoComplete={autoComplete}
                    type={type}
                    id={field}
                    name={field}
                    value={value}
                    />
            </div>
            </div>
            {!!error && <p className="text-danger">{error}</p>}
        </>
    );
};

TextFieldGroup.popTypes = {
    field: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    autoComplete: PropTypes.string.isRequired
};
TextFieldGroup.defaultProps = {
    type: "text",
    autoComplete: "on"
};

export default TextFieldGroup;