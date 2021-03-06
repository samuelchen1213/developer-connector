import React, { Component } from "react"; 
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types'
import { createProfile } from '../../actions/profileActions';

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
        };

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

    onSubmit = (event) => {
        event.preventDefault();
        const profileData = {
            handle: this.state.handle,
            company: this.state.company,
            website: this.state.website,
            location: this.state.location,
            status: this.state.status,
            skills: this.state.skills,
            bio: this.state.bio,
            githubusername: this.state.githubusername,
            youtube: this.state.youtube,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            instagram: this.state.instagram,
        }
        this.props.createProfile(profileData, this.props.history);
    }

    onChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }
  
    render() {
        const { errors, displaySocialInput } = this.state;

        let socialInputs;
        if (displaySocialInput) {
            socialInputs = (
                <div>
                    <InputGroup 
                        placeholder="LinkedIn Profile URL"
                        name="linkedin"
                        icon="fab fa-linkedin"
                        value={this.state.linkedin}
                        onChange={this.onChange}
                        error={errors.linkedin}
                    />
                    <InputGroup 
                        placeholder="Twitter Profile URL"
                        name="twitter"
                        icon="fab fa-twitter"
                        value={this.state.twitter}
                        onChange={this.onChange}
                        error={errors.twitter}
                    />
                    <InputGroup 
                        placeholder="Facebook Profile URL"
                        name="facebook"
                        icon="fab fa-facebook"
                        value={this.state.facebook}
                        onChange={this.onChange}
                        error={errors.facebook}
                    />
                    <InputGroup 
                        placeholder="Youtube Channel URL"
                        name="youtube"
                        icon="fab fa-youtube"
                        value={this.state.youtube}
                        onChange={this.onChange}
                        error={errors.youtube}
                    />
                    <InputGroup 
                        placeholder="Instagram Page URL"
                        name="instagram"
                        icon="fab fa-instagram"
                        value={this.state.instagram}
                        onChange={this.onChange}
                        error={errors.instagram}
                    />
                </div>
            );
        } 

        // Options for status
        const options = [
            { label: '* Select Professional Status', value: 0 },
            { label: 'Developer', value: 'Developer' }, 
            { label: 'Junior Developer', value: 'Junior Developer' },
            { label: 'Senior Developer', value: 'Senior Developer' },
            { label: 'Manager', value: 'Manager' },
            { label: 'Student', value: 'Student' },
            { label: 'Teacher / Instructor', value: 'Teacher / Instructor' },
            { label: 'Intern', value: 'Intern' },
            { label: 'Other', value: 'Other' }
        ]

        return (
        <div className="create-profile">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        
                        <h1 className="lead display-4 text-center">
                            Let's Create Your Profile! 
                        </h1>

                        <p className="lead text-center">Fill this out to make you stand out!</p>
                        <small className="d-block pb-3"> * = required fields</small>

                        <form onSubmit={this.onSubmit}>
                            <TextField
                                placeholder="* Profile Handle"
                                name="handle"
                                value={this.state.handle}
                                onChange={this.onChange}
                                error={errors.handle}
                                info="A unique handle for your profile URL"
                            />

                            <SelectList
                                placeholder="Status"
                                name="status"
                                value={this.state.status}
                                onChange={this.onChange}
                                options={options}
                                error={errors.status}
                                info="Where are you in your develeloper journey?"
                            />

                            <TextField
                                placeholder="Company / Institution"
                                name="company"
                                value={this.state.company}
                                onChange={this.onChange}
                                error={errors.company}
                                info="Where do you currently work or study?"
                            />

                            <TextField
                                placeholder="Website"
                                name="website"
                                value={this.state.website}
                                onChange={this.onChange}
                                error={errors.website}
                                info="Your portfolio or your company's site"
                            />

                            <TextField
                                placeholder="Location"
                                name="location"
                                value={this.state.location}
                                onChange={this.onChange}
                                error={errors.location}
                                info="Where are you located? (Eg. Waterloo, ON)"
                            />

                            <TextField
                                placeholder="* Skills"
                                name="skills"
                                value={this.state.skills}
                                onChange={this.onChange}
                                error={errors.skills}
                                info="Please use comma seperated values (eg. HTML,CSS,Javascript,Eating chicken nuggets)"
                            />

                            <TextField
                                placeholder="Github Username"
                                name="githubusername"
                                value={this.state.githubusername}
                                onChange={this.onChange}
                                error={errors.githubusername}
                                info="If you would like to showcase your repos, this is required!"
                            />

                            <TextArea
                                placeholder="Bio"
                                name="bio"
                                value={this.state.bio}
                                onChange={this.onChange}
                                error={errors.bio}
                                info="What would you like people to know about you?"
                            />

                            <div className="mb-3">
                                <button 
                                    onClick={() => this.setState(prevState => ({
                                        displaySocialInput: !prevState.displaySocialInput
                                    }))} 
                                    className="btn btn-light">
                                        Add Social Media
                                </button>
                                <span className="text-muted ml-2">Optional</span>
                            </div>

                            {socialInputs}

                            <input type="submit" value="Submit" className="btn btn-primary btn-block mt-4"/>
                        </form>

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

export default connect(mapStateToProps, {createProfile})(withRouter(CreateProfile));