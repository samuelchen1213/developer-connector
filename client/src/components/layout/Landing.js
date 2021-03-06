import React, { Component } from "react"; 
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class Landing extends Component {

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard')
        }
    }

    render() {
        return (
            <div className="landing">
                <div className="dark-overlay landing-inner text-light">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                
                                <h1 className="display-3 mb-4">
                                    {/*eslint-disable-next-line*/}
                                    <span role="img">&#x1F5A5;</span> 
                                    <span> </span>
                                    Developer Connector  
                                    <span> </span>
                                    {/*eslint-disable-next-line*/}
                                    <span role="img">&#x1F913;</span> 
                                </h1>


                                <p className="lead"> Showcase your skills and education as a developer, utlilize posts get help from other developers!</p>
                                <hr />
                                <Link to="/register" className="btn btn-lg btn-success mr-2">Sign Up</Link>
                                <Link to="/login" className="btn btn-lg btn-light">Login</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Landing.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(Landing);