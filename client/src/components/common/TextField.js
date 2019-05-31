import React from 'react'
import classnames from 'classnames';
import PropTypes from 'prop-types';

const textField = ({
    type,
    error,
    placeholder,
    name,
    info,
    label, 
    value,
    onChange,
    disabled
}) => {
    return (
        <div className="form-group">
            <input 
                type={type}
                className={classnames('form-control form-control-lg', {
                    'is-invalid': error
                })}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}/>
            {info && <small className="form-text text-muted">{info}</small>}
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    )
}

textField.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    info: PropTypes.string,
    error: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    disables: PropTypes.string
}

textField.defaultProps = {
    type: 'text'
}

export default textField;
