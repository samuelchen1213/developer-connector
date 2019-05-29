import React, { Component } from "react"; 
import video from '../../img/hero.mp4';
import img from '../../img/showcase.jpg';

class Landing extends Component {
    render() {
        return (
            <div className="landing">
                <div className="dark-overlay landing-inner text-light">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                            
                                <div className="fullscreen-bg">
                                    <video poster={img} playsinline="playsinline" autoplay="autoplay" muted="muted" loop="loop">
                                        <source src={video}/>
                                    </video>
                                </div>
                                
                                <h1 className="display-3 mb-4">
                                    {/*eslint-disable-next-line*/}
                                    <span role="img">&#x1F5A5;</span> 
                                    <span> </span>
                                    Developer Connector  
                                    <span> </span>
                                    {/*eslint-disable-next-line*/}
                                    <span role="img">&#x1F913;</span> 
                                </h1>


                                <p className="lead"> Create a profile to showcase yourself as a developer, utlilize posts get help from other developers!</p>
                                <hr />
                                <a href="register.html" className="btn btn-lg btn-success mr-2">Sign Up</a>
                                <a href="login.html" className="btn btn-lg btn-light">Login</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Landing;