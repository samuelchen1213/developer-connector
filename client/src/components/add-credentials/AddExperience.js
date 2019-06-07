import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profileActions';

import TextField from '../common/TextField'
import TextArea from '../common/TextArea';

class AddExperience extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company: '',
            title: '',
            location: '',
            from: '',
            to: '',
            current: false,
            description: '',
            errors: {},
            disabled: false
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCheck = this.onCheck.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors})
        }
    }

    onSubmit = (event) => {
        event.preventDefault();
        const dataExp = {
            company: this.state.company,
            title: this.state.title,
            location: this.state.location,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current,
            description: this.state.description,
        }

        this.props.addExperience(dataExp, this.props.history)
    }

    onChange = (event) => {
		this.setState({[event.target.name]: event.target.value})
    }

    onCheck = (event) => {
        this.setState({
            disabled: !this.state.disabled,
            current: !this.state.current
        })
    }
  
    render() {
        const { errors } = this.state;

        return (
            <div className="add-experience">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 ml-0 mt-1">
                            <Link to="/dashboard" className="btn btn-light"> 
                                {/*eslint-disable-next-line*/}
                                <span role="img">&#x1F519;</span>
                                {' '}
                                Go Back
                            </Link>
                        </div>
                        <div className="col-md-8 m-auto">
                             <h1 className="display-4 text-center">
                                 Add some experience!
                             </h1>
                             <p className="lead text-center">
                                 Showcase your work experience, let them know what you're made of!
                             </p>
                             <small className="d-block pb-3"> * = required fields </small>

                            <form onSubmit={this.onSubmit}>
                                <TextField 
                                    placeholder="* Company"
                                    name="company"
                                    value={this.state.company}
                                    onChange={this.onChange}
                                    error={errors.company}
                                />
                                <TextField 
                                    placeholder="* Job Title"
                                    name="title"
                                    value={this.state.title}
                                    onChange={this.onChange}
                                    error={errors.title}
                                />
                                <TextField 
                                    placeholder="Location"
                                    name="location"
                                    value={this.state.location}
                                    onChange={this.onChange}
                                    error={errors.location}
                                />
                                <h6>From Date:</h6>
                                <TextField 
                                    name="from"
                                    type="date"
                                    value={this.state.from}
                                    onChange={this.onChange}
                                    error={errors.from}
                                />
                                <h6>To Date:</h6>
                                <TextField 
                                    name="to"
                                    type="date"
                                    value={this.state.to}
                                    onChange={this.onChange}
                                    error={errors.to}
                                    disabled={this.state.disabled ? 'disabled' : ''}
                                />
                                <div className="form-check mb-4">
                                    <input 
                                        type="checkbox"
                                        className="form-check-input"
                                        name="current"
                                        value={this.state.current}
                                        checked={this.state.current}
                                        onChange={this.onCheck}
                                        id="current"
                                    />
                                    <label htmlFor="current" className="form-check-label">
                                        Current Job
                                    </label>
                                </div>
                                <TextArea 
                                    placeholder="Job description"
                                    name="description"
                                    value={this.state.description}
                                    onChange={this.onChange}
                                    error={errors.description}
                                    info="Give us some details of the cool things you did"
                                />
                                <input type="submit" value="Submit" className="btn btn-primary btn-block mt-4"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

AddExperience.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    addExperience: PropTypes.func.isRequired
}

const mapPropsToState = state => ({
    profile: state.profile,
    errors: state.errors
})

export default connect(mapPropsToState, {addExperience})(withRouter(AddExperience));