import React, { Component } from 'react';
import NavItem from './NavItem';
import NavLogo from './NavLogo';

import { Link } from 'react-router-dom';

 class Header extends Component {

  state = {
    continent: 'Hyboria',
    txt: 'of Conan'
  }


  render() {

    const styleObj = {
      width: '600px',
      height: '400px',
    };

    return (
      <React.Fragment>
        <header>
          <div className="main-nav-container">
            <nav className="main-nav">
              <NavLogo />
              <div className="main-menu-container">
                <ul className="main-menu">
                  <NavItem linkPath="/" linkName="home"/>
                  <NavItem linkPath="/about" linkName="about"/>
                  <NavItem linkPath="/apod" linkName="apod"/>
                  <NavItem linkPath="/marsrover" linkName="mars rover"/>
                  <NavItem linkPath="/map" linkName="map"/>
                  <NavItem linkPath="/epic" linkName="EPIC"/>

                </ul>
              </div>
            </nav>
          </div>
        </header>
      </React.Fragment>  
        
    )
  }

}

export default Header;