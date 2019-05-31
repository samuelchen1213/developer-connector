import React, { Component } from "react"; 
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { getCurrentProfile } from '../../actions/profileActions';

class Dashboard extends Component {
    componentDidMount() {
        this.props.getCurrentProfile();
    }
    
    render() {
        return (
            <h1>yuh</h1>
        );
    }
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired
}

export default connect(null, { getCurrentProfile })(Dashboard);