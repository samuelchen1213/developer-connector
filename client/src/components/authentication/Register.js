import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom';
import { connect  } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import classnames from 'classnames';

class Register extends Component {
	constructor() {
		super();
		this.state = {
			name: '',
			email: '',
			password: '',
			password2: '',
			errors: {}
		}
		
		this.onChange = this.onChange.bind();
		this.onSubmit = this.onSubmit.bind();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({errors: nextProps.errors});
		}
	}
	
	onChange = (event) => {
		this.setState({[event.target.name]: event.target.value})
	}

	onSubmit  = (event) => {
		event.preventDefault();
		const newUser = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			password2: this.state.password2
		}
		
		this.props.registerUser(newUser, this.props.history);
	}

    render() {
		const { errors } = this.state;

        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">Create your Developer account</p>
                            <form noValidate onSubmit={this.onSubmit}>
                                
                                {/*// ? Name */}
                                <div className="form-group">
									<input 
										type="text" 
										className={classnames('form-control form-control-lg', {
											'is-invalid': errors.name
										})}
										placeholder="Name"  
										name="name"
										value={this.state.name}
										onChange={this.onChange}/>
									<div className="invalid-feedback">{errors.name}</div>
                                </div>

                                {/*// ? Email */}
                                <div className="form-group">
									<input 
										type="email" 
										className={classnames('form-control form-control-lg', {
											'is-invalid': errors.email
										})}
										placeholder="Email Address" 
										name="email" 
										value={this.state.email} 
										onChange={this.onChange}/>
									<div className="invalid-feedback">{errors.email}</div>
                                    <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                                </div>

                                {/*// ? Password */}
                                <div className="form-group">
									<input 
										type="password" 
										className={classnames('form-control form-control-lg', {
											'is-invalid': errors.password
										})} 
										placeholder="Password" 
										name="password"
										value={this.state.password} 
										onChange={this.onChange} />
									<div className="invalid-feedback">{errors.password}</div>
                                </div>

                                {/*// ? Confirm */}
                                <div className="form-group">
									<input 
										type="password" 
										className={classnames('form-control form-control-lg', {
											'is-invalid': errors.password2
										})} 
										placeholder="Confirm Password"  
										name="password2" 
										value={this.state.password2}
										onChange={this.onChange}/>
									<div className="invalid-feedback">{errors.password2}</div>
                                </div>
                                
                                <input type="submit" className="btn btn-primary btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Register.prototypes = {
	registerUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps, {registerUser})(withRouter(Register));