import React, { Component } from "react"; 
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { getCurrentProfile } from '../../actions/profileActions';
import { Link } from 'react-router-dom'

import Spinner from '../common/Spinner';

class Dashboard extends Component {

    componentDidMount() {
        this.props.getCurrentProfile();
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
                dashboardContent = <h4>PROFILE DISPLAY</h4>
            } else {
                // User logged in, but no profile
                dashboardContent = (
                    <div>
                        <p className="lead text-muted">
                            Welcome {user.name}!
                            {" "}
                            {/*eslint-disable-next-line*/}
                            <span role="img">&#x1F44B;</span>  
                        </p>
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
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);