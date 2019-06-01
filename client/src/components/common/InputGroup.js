import React from 'react'
import classnames from 'classnames';
import PropTypes from 'prop-types';

const inputGroup = ({
    error,
    placeholder,
    name,
    value,
    onChange,
    icon,
    type
}) => {
    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text">
                    <i className={icon} />
                </span>
            </div>

            <input
                className={classnames('form-control form-control-lg', {
                    'is-invalid': error
                })}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}/>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    )
}

inputGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    icon: PropTypes.string,
    type: PropTypes.string.isRequired,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired
}

inputGroup.defaultProps = {
    type: 'text'
}

export default inputGroup;
