import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profileActions';

import TextField from '../common/TextField'
import TextArea from '../common/TextArea';

class AddEducation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            school: '',
            degree: '',
            fieldofstudy: '',
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
        const dataEdu = {
            school: this.state.school,
            degree: this.state.degree,
            fieldofstudy: this.state.fieldofstudy,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current,
            description: this.state.description,
        }

        this.props.addEducation(dataEdu, this.props.history)
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
            <div className="add-education">
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
                                 Attended any schools or bootcamps?
                             </h1>
                             <p className="lead text-center">
                                 Showcase where you have been and what you learned!
                             </p>
                             <small className="d-block pb-3"> * = required fields </small>

                            <form onSubmit={this.onSubmit}>
                                <TextField 
                                    placeholder="* School"
                                    name="school"
                                    value={this.state.school}
                                    onChange={this.onChange}
                                    error={errors.school}
                                />
                                <TextField 
                                    placeholder="* Degree / Certification "
                                    name="degree"
                                    value={this.state.degree}
                                    onChange={this.onChange}
                                    error={errors.degree}
                                />
                                <TextField 
                                    placeholder="* Field of study"
                                    name="fieldofstudy"
                                    value={this.state.fieldofstudy}
                                    onChange={this.onChange}
                                    error={errors.fieldofstudy}
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
                                    placeholder="Description"
                                    name="description"
                                    value={this.state.description}
                                    onChange={this.onChange}
                                    error={errors.description}
                                    info="Give us some details of the cool stuff you learned"
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

AddEducation.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    addEducation: PropTypes.func.isRequired
}

const mapPropsToState = state => ({
    profile: state.profile,
    errors: state.errors
})

export default connect(mapPropsToState, {addEducation})(withRouter(AddEducation));