import React, { Component } from "react"; 
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import { Link } from 'react-router-dom'

import Spinner from '../common/Spinner';
import ProfileActions from './ProfileActions';
import Experience from './Experience'

class Dashboard extends Component {

    componentDidMount() {
        this.props.getCurrentProfile();
    }

    deleteAccountHandler = (event) => {
        this.props.deleteAccount();
    }

    render() {
        const { user } = this.props.auth;
        const { profile, loading } = this.props.profile;
        
        let dashboardContent;

        if (profile === null || loading) {
            dashboardContent = <Spinner/>
        } else { 
            // Check if logged in user have profile data
            if (Object.keys(profile).length > 0) {
                // TODO: Display profile
                dashboardContent = (
                    <div>
                        <p className="lead text-muted">
                            Welcome! <Link to={`/profile/${profile.handle}`}>{user.name} </Link>
                            {" "}
                            {/*eslint-disable-next-line*/}
                            <span role="img">&#x1F44B;</span>  
                        </p>
                        <ProfileActions />
                        <Experience experience={profile.experience}/>
                        <div style={{marginBottom: "60px"}}></div>
                        <button onClick={this.deleteAccountHandler.bind()} className="btn btn-danger">Delete Account</button>
                    </div>
                );
            } else {
                // User logged in, but no profile
                dashboardContent = (
                    <div>
                        <p>You have not set up a profile yet, create it now!</p>
                        <Link to="/create-profile" className="btn btn-lg btn-success">
                            Create Profile
                        </Link>
                    </div>
                )
            }
        }

        return (
            <div className="dashboard">  
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4">Dashboard</h1>
                            {dashboardContent}
                        </div>
                    </div>
                </div>
            </div>  
        );
    }
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);