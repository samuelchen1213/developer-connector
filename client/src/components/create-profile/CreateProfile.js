import React, { Component } from "react"; 
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import TextField from '../common/TextField';
import TextArea from '../common/TextArea';
import SelectList from '../common/SelectList';
import InputGroup from '../common/InputGroup';

class CreateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displaySocialInput: false,
            handle: '',
            company: '',
            website: '',
            location: '',
            status: '',
            skills: '',
            bio: '',
            githubusername: '',
            youtube: '',
            twitter: '',
            facebook: '',
            linkedin: '',
            instagram: '',
            errors: {}
        }
    }
  
    render() {
        return (
        <div className="create-profile">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        
                        <h1 className="lead display-4 text-center">
                            Let's create your profile! 
                        </h1>
                        <p className="lead text-center">Fill this out to make you stand out!</p>
                        <small className="d-block pb-3"> * = required fields</small>
                    </div>
                </div>
            </div>
        </div>
        );
    } 
}

CreateProfile.propType = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps)(CreateProfile);