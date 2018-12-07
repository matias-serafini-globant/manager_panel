import React, { Component } from 'react';

import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// CSS
import './Home.css'

class Home extends Component {
    render() {
        return(
            <div className="Navbar">
                    <div className="Navbar__Link Navbar__Link-brand">
                        Website title
                    </div>
                    <div class="Navbar__Link Navbar__Link-toggle">
                        <FontAwesomeIcon icon={faBars} />
                    </div>
                <nav className="Navbar__Items">
                    <div className="Navbar__Link">
                        Link
                    </div>
                    <div className="Navbar__Link">
                        Link
                    </div>
                    <div className="Navbar__Link">
                        Link
                    </div>
                </nav>
                <nav className="Navbar__Items Navbar__Items--right">
                    <div className="Navbar__Link">
                        Link
                    </div>
                    <div className="Navbar__Link">
                        Link
                    </div>
                </nav>
            </div>
        );

    }
}

export default Home;