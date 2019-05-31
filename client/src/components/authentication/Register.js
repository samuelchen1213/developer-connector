import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom';
import { connect  } from 'react-redux';
import { registerUser } from '../../actions/authActions';

import TextField from '../common/TextField';

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

	componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard')
        }
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
                            <p className="lead text-center">Start connecting and learning!</p>
                            <form noValidate onSubmit={this.onSubmit}>
                                
								
								<TextField 
									placeholder="Name"  
									name="name"
									type="text" 
									value={this.state.name}
									error={errors.name}
									onChange={this.onChange}
								/>
								
								<TextField 
									placeholder="Email Address"  
									name="email"
									type="email" 
									value={this.state.email}
									error={errors.email}
									onChange={this.onChange}
									info="If you want an Gravatar, use an email that supports Gravatars!"
								/>

								<TextField 
									placeholder="Password"  
									name="password"
									type="password" 
									value={this.state.password}
									error={errors.password}
									onChange={this.onChange}
								/>	

								<TextField 
									placeholder="Password"  
									name="password2"
									type="password" 
									value={this.state.password2}
									error={errors.password2}
									onChange={this.onChange}
								/>	
                                
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