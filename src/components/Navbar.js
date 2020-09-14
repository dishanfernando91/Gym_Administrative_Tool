import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.jpg'

export default function Navbar() {

    const [menu, setMenu] = useState(false);

    const toggleMenu = () => {
        setMenu(!menu)
    }

    const show = menu ? "show" : "" ;

    return (
        <nav className="navbar navbar-expand-sm bg-success navbar-dark">
            <div className="container">
                <Link to="/" className="navbar-brand"><img className="nav-img" src={logo} />MuscleQuest</Link>
                <button className="navbar-toggler" onClick={() => toggleMenu()}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${show}`}>
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/show" className="nav-link">Members</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/create" className="nav-link">Create Member</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/packages" className="nav-link">Packages</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
