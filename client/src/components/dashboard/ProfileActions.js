import React from 'react'
import { Link } from 'react-router-dom'

export default function ProfileActions() {
    return (
        <div className="btn-group mb-4" role="group">
            <Link to="/edit-profile" className="btn btn-light">
                <i className="fas fa-user-circle text-primary mr-1"></i> Edit Profile
            </Link>
            <Link to="/add-experience" className="btn btn-light">
                <i className="fab fa-black-tie text-primary mr-1"></i>
                Add Experience
            </Link>
            <Link href="/add-education" className="btn btn-light">
                <i className="fas fa-graduation-cap text-primary mr-1"></i>
                Add Education
            </Link>
         </div>
    )
}
