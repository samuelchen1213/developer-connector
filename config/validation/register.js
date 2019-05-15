const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};
    
    // Make sure it is a string
    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : ''; // Confirm

    // Name
    if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
         errors.name = 'Name must be between 2 and 30 characters';
    }

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }
    
    // Email
    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }
    
    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    // Password
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }
    
    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'Password must be at least 6 characters';
    }

    // Password
    if (Validator.isEmpty(data.password2)) {
        errors.password2 = 'Confirm password field is required';
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = 'Passwords do not match';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}