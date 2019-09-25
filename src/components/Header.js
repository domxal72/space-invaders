import React, { Component } from 'react';
import NavItem from './NavItem';
import NavLogo from './NavLogo';

class Header extends Component {

  render() {

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
                  <NavItem linkPath="/apod" linkName="APOD"/>
                  <NavItem linkPath="/searchimage" linkName="Search Image"/>
                  <NavItem linkPath="/marsrover" linkName="mars rover"/>
                  <NavItem linkPath="/map" linkName="map"/>
                  <NavItem linkPath="/epic" linkName="EPIC"/>
                  <NavItem linkPath="/insight" linkName="InSight"/>
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